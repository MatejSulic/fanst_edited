import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Experiment from "../../../../../../lib/db/models/Experiment";
import ExperimentProgress from "../../../../../../lib/db/models/ExperimentProgress";
import ExperimentResultsModel from "../../../../../../lib/db/models/ExperimentResults";
import dbConnect from "../../../../../../lib/db/mongooseDb";
import ExperimentModel from "../../../../../../lib/db/models/Experiment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId, participantId } = req.query;
  const experimentIdObjectId = new Types.ObjectId(experimentId as string);
  const participantIdObjectId = new Types.ObjectId(participantId as string);

  if (req.method === "POST") {
    const experiment = await ExperimentModel.findById(experimentIdObjectId);

    try {
      if (!experiment.participants.find((id) => id === participantId)) {
        console.log("participant does not exist anymore");
        res.status(404).end();
        return;
      }

      const createdExperimentProgress = new ExperimentProgress({
        experimentId: experimentIdObjectId,
        participantId: participantIdObjectId,
      });
      await createdExperimentProgress.save();

      res.status(200).json({ success: true, data: createdExperimentProgress });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "GET") {
    try {
      // potentionally `null` if ExperimentProgress does not exist yet
      const experimentProgress = await ExperimentProgress.findOne({
        experimentId: experimentIdObjectId,
        participantId: participantIdObjectId,
      });

      res.status(200).json({ success: true, data: experimentProgress });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "PATCH") {
    try {
      const experimentProgress = await ExperimentProgress.findOne({
        experimentId: experimentIdObjectId,
        participantId: participantIdObjectId,
      });
      const experiment = await Experiment.findOne({
        _id: experimentIdObjectId,
      });

      const { sectionResults, ...experimentProgressData } = req.body;

      // if the submitted data contains section results, increase currentSectionIdx
      if (sectionResults || sectionResults === null) {
        experimentProgress.sectionResults.push(sectionResults);
        if (
          experiment.sections.length === 0 ||
          experimentProgress.currentSectionIdx ===
            experiment.sections.length - 1
        ) {
          experimentProgress.finished = true;
          const experimentResults = new ExperimentResultsModel({
            experimentId: experimentProgress.experimentId,
            participantId: experimentProgress.participantId,
            experimentProgressId: experimentProgress._id,
            sectionResults: [...experimentProgress.sectionResults],
          });
          await experimentResults.save();
        } else {
          experimentProgress.currentSectionIdx += 1;
        }
      }

      // update other fields
      Object.entries(experimentProgressData).forEach(
        ([key, value]) => (experimentProgress[key] = value)
      );

      await experimentProgress.save();

      res.status(200).json({ success: true, data: experimentProgress });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
