import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Question from "../../../../../../../lib/db/models/Question";
import Section from "../../../../../../../lib/db/models/Section";
import dbConnect from "../../../../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId, sectionId, questionId } = req.query;

  if (req.method === "DELETE") {
    try {
      const question = await Question.findOne({
        experimentId: experimentId,
        sectionId: sectionId,
        _id: questionId,
      });
      const allSectionQuestions = await Question.find({
        experimentId: experimentId,
        sectionId: sectionId,
      });
      await Promise.all(
        allSectionQuestions.map(async (ques) => {
          if (ques.position > question.position) {
            ques.position = ques.position - 1;
            await ques.save();
          }
        })
      );
      await question.remove();

      const section = await Section.findById(new ObjectId(sectionId as string));
      section.questions = section.questions.filter(
        (item) => item !== questionId
      );
      await section.save();

      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "PATCH") {
    try {
      const question = await Question.findOne({
        experimentId: experimentId,
        sectionId: sectionId,
        _id: questionId,
      });
      const { position, ...questionDetails } = req.body;

      // update position of this question and other section questions
      if (position) {
        const allSectionQuestions = await Question.find({
          experimentId: experimentId,
          sectionId: sectionId,
        });

        if (position > question.position) {
          // new position is greater than the old one
          allSectionQuestions
            .filter(
              (quest) =>
                quest.position <= position && quest.position > question.position
            )
            .forEach(async (quest) => {
              quest.position = quest.position - 1;
              await quest.save();
            });
        } else {
          // new position is lower than the old one
          allSectionQuestions
            .filter(
              (quest) =>
                quest.position >= position && quest.position < question.position
            )
            .forEach(async (quest) => {
              quest.position = quest.position + 1;
              await quest.save();
            });
        }
        question.position = position;
      }

      Object.entries(questionDetails).forEach(
        ([key, value]) => (question[key] = value)
      );
      await question.save();

      res.status(200).json({ success: true, data: question });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
