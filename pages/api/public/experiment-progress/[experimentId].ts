import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import ExperimentProgress from "../../../../lib/db/models/ExperimentProgress";
import dbConnect from "../../../../lib/db/mongooseDb";

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

      Object.entries(req.body).forEach(
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
