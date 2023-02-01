import { NextApiRequest, NextApiResponse } from "next";
import ExperimentModel from "../../../lib/db/models/Experiment";
import Participant from "../../../lib/db/models/Participant";
import dbConnect from "../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const participants = await Participant.find({});
      const result = [];
      await Promise.all(
        participants.map(async (participant) => {
          const participantExperiments = await ExperimentModel.find({
            participants: participant._id.toString(),
          });
          result.push({
            participant: participant._id.toString(),
            participantEmail: participant.email,
            participantExperiments,
            links: [
              participantExperiments.map(
                (participantExperiment) =>
                  `/public/experiment-preview/${participantExperiment._id.toString()}/${participant._id.toString()}`
              ),
            ],
          });
        })
      );
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
