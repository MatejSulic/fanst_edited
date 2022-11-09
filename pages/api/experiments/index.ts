import { NextApiRequest, NextApiResponse } from "next";
import Experiment from "../../../lib/db/models/Experiment";
import dbConnect from "../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const experiments = await Experiment.find({});
      res.status(200).json({ success: true, data: experiments });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === "POST") {
    try {
      const createdExperiment = new Experiment(req.body);
      createdExperiment.save();
      res.status(200).json({ success: true, data: createdExperiment });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
