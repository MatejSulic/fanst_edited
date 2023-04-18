import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../lib/db/mongooseDb";
import ExperimentModel from "../../../../../lib/db/models/Experiment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId } = req.query;

  if (req.method === "GET") {
    try {
      const experiment = await ExperimentModel.findById(
        new ObjectId(experimentId as string)
      );

      res.status(200).json({ success: true, data: experiment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
