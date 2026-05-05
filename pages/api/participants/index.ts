import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db/mongooseDb";
import ExperimentModel from "../../../lib/db/models/Experiment";
import { ObjectId } from "mongodb";
import Participant from "../../../lib/db/models/Participant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const searchQuery = req.query;
    try {
      let participants;
      if (
        searchQuery.experimentId &&
        searchQuery.experimentId !== "null" &&
        searchQuery.experimentId !== "undefined"
      ) {
        const experimentParticipants = await ExperimentModel.findById(
          new ObjectId(searchQuery.experimentId as string)
        ).select({ participants: 1, _id: 0 });
        participants = await Participant.find({
          _id: { $in: experimentParticipants.participants },
        });
      } else {
        participants = [];
      }
      res.status(200).json({ success: true, data: participants || [] });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
