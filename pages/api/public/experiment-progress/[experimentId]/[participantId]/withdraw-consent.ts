import { NextApiRequest, NextApiResponse } from "next";
import ExperimentProgress from "../../../../../../lib/db/models/ExperimentProgress";
import ExperimentResultsModel from "../../../../../../lib/db/models/ExperimentResults";
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
      const experimentResult = await ExperimentResultsModel.findOne({
        experimentId: experimentId,
        participantId: participantId,
        experimentProgressId: experimentProgress._id,
      });

      await experimentProgress.remove();
      await experimentResult.remove();

      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
