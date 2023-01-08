import { NextApiRequest, NextApiResponse } from "next";
import Experiment, {
  inviteParticipant,
} from "../../../../lib/db/models/Experiment";
import Participant from "../../../../lib/db/models/Participant";
import dbConnect from "../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId } = req.query;

  if (req.method === "POST") {
    try {
      const { email } = req.body;
      let experiment = await Experiment.findOne({
        _id: experimentId,
      });
      const existingParticipantWithThatEmail = await Participant.find({
        email: email,
        _id: { $in: experiment.participants },
      });
      if (existingParticipantWithThatEmail.length > 0) {
        res.status(400).json({
          success: false,
          data: "Participant with that email already exists in the experiment!",
        });
        return;
      }

      await inviteParticipant(experimentId as string, email);

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
