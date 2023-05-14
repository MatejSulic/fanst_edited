import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import ExperimentModel from "../../../../../../lib/db/models/Experiment";
import Question from "../../../../../../lib/db/models/Question";
import Section from "../../../../../../lib/db/models/Section";
import dbConnect from "../../../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId, sectionId } = req.query;

  if (req.method === "GET") {
    try {
      const section = await Section.find({
        experimentId: experimentId,
        _id: sectionId,
      });
      res.status(200).json({ success: true, data: section });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "PATCH") {
    try {
      const section = await Section.findOne({
        experimentId: experimentId,
        _id: sectionId,
      });
      const { questions, position, ...sectionDetails } = req.body;

      // update position of this section and other experiment sections
      if (position) {
        const allExperimentSections = await Section.find({
          experimentId: experimentId,
        });

        if (position > section.position) {
          // new position is greater than the old one
          allExperimentSections
            .filter(
              (sec) =>
                sec.position <= position && sec.position > section.position
            )
            .forEach(async (sec) => {
              sec.position = sec.position - 1;
              await sec.save();
            });
        } else {
          // new position is lower than the old one
          allExperimentSections
            .filter(
              (sec) =>
                sec.position >= position && sec.position < section.position
            )
            .forEach(async (sec) => {
              sec.position = sec.position + 1;
              await sec.save();
            });
        }
        section.position = position;
      }

      // update section title and description values from the request
      Object.entries(sectionDetails).forEach(
        ([key, value]) => (section[key] = value)
      );
      await section.save();

      // update questions
      if (questions) {
        const questionDocuments = await Question.find({
          _id: { $in: Object.keys(questions) },
        });
        questionDocuments.forEach(async (doc) => {
          Object.entries(questions[doc._id.toString()]).forEach(
            ([key, value]) => (doc[key] = value)
          );
          await doc.save();
        });
      }

      res.status(200).json({ success: true, data: section });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "DELETE") {
    try {
      const section = await Section.findOne({
        experimentId: experimentId,
        _id: sectionId,
      });
      const allExperimentSections = await Section.find({
        experimentId: experimentId,
      });
      await Promise.all(
        allExperimentSections.map(async (sec) => {
          if (sec.position > section.position) {
            sec.position = sec.position - 1;
            await sec.save();
          }
        })
      );
      const deletedQuestionsCount = await Question.deleteMany({
        _id: { $in: section.questions },
      });
      await section.remove();

      const experiment = await ExperimentModel.findById(
        new ObjectId(experimentId as string)
      );
      experiment.sections = experiment.sections.filter(
        (item) => item !== sectionId
      );
      await experiment.save();

      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
