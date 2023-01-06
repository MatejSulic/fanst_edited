import { NextApiRequest, NextApiResponse } from "next";
import Experiment, {
  inviteParticipant,
} from "../../../../lib/db/models/Experiment";
import dbConnect from "../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId } = req.query;

  if (req.method === "POST") {
    try {
      let experiment = await Experiment.findOne({
        _id: experimentId,
      });

      const { email } = req.body;
      await inviteParticipant(experiment._id.toString(), email);

      // fetch updated experiment
      experiment = await Experiment.findOne({
        _id: experimentId,
      });

      res.status(200).json({ success: true, data: experiment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
