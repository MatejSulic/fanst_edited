import { NextApiRequest, NextApiResponse } from "next";
import ExperimentProgress from "../../../../../../lib/db/models/ExperimentProgress";
import dbConnect from "../../../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId, participantId } = req.query;

  if (req.method === "POST") {
    try {
      const experimentProgress = await ExperimentProgress.findOne({
        experimentId: experimentId,
        participantId: participantId,
      });
      await experimentProgress.remove();

      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
