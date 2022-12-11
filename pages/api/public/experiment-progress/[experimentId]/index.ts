import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Experiment from "../../../../../lib/db/models/Experiment";
import ExperimentProgress from "../../../../../lib/db/models/ExperimentProgress";
import dbConnect from "../../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId } = req.query;

  if (req.method === "POST") {
    try {
      const experimentIdObjectId = new Types.ObjectId(experimentId as string);

      const createdExperimentProgress = new ExperimentProgress({
        experimentId: experimentIdObjectId,
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
        experimentId: experimentId,
      });

      res.status(200).json({ success: true, data: experimentProgress });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "PATCH") {
    try {
      const experimentProgress = await ExperimentProgress.findOne({
        experimentId: experimentId,
      });
      const experiment = await Experiment.findOne({
        _id: experimentId,
      });

      const { sectionResults, ...experimentProgressData } = req.body;

      // if the submitted data contains section results, increase currentSectionIdx
      if (sectionResults) {
        experimentProgress.sectionResults.push(sectionResults);
        if (
          experiment.sections.length === 0 ||
          experimentProgress.currentSectionIdx ===
            experiment.sections.length - 1
        ) {
          experimentProgress.finished = true;
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
