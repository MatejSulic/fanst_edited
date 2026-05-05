import { NextApiRequest, NextApiResponse } from "next";
import { copyExperiment } from "../../../../lib/db/models/Experiment";
import dbConnect from "../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId } = req.query;

  if (req.method === "POST") {
    try {
      const newExperiment = await copyExperiment(experimentId as string);

      res.status(200).json({ success: true, data: newExperiment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
