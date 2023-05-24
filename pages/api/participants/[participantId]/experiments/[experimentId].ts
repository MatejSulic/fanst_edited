import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../lib/db/mongooseDb";
import Participant from "../../../../../lib/db/models/Participant";
import { ObjectId } from "mongodb";
import ExperimentModel from "../../../../../lib/db/models/Experiment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { participantId, experimentId } = req.query;

  if (req.method === "DELETE") {
    try {
      await Participant.findOneAndDelete(new ObjectId(participantId as string));

      const experiment = await ExperimentModel.findById(
        new ObjectId(experimentId as string)
      );

      // remove participant from experiment.participants
      experiment.participants = experiment.participants.filter(
        (item) => item !== participantId
      );

      // remove participant from experiment.participantsPerGroups
      const removedParticipantIndexInGroup = experiment.participantsPerGroups
        .find((obj) => obj.get("participants").includes(participantId))
        .get("participants")
        .indexOf(participantId);

      experiment.participantsPerGroups
        .find((obj) => obj.get("participants").includes(participantId))
        .get("participants")
        .splice(removedParticipantIndexInGroup, 1);
      experiment.markModified("participantsPerGroups");

      await experiment.save();

      res.status(200).json({ success: true, data: experiment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
