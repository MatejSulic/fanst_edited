import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { ParticipantGroupType } from "../../../types/participantGroup";
import dbConnect from "../mongooseDb";
import Experiment from "./Experiment";

const ParticipantGroupSchema = new Schema<ParticipantGroupType>({
  experimentId: {
    type: Schema.Types.ObjectId,
    ref: "Experiment",
    required: true,
  },
  participants: { type: [String], default: [] },
});

const ParticipantGroupModel =
  mongoose.models.ParticipantGroup ||
  mongoose.model("ParticipantGroup", ParticipantGroupSchema);
export default ParticipantGroupModel;

export const createParticipantGroupsForExperiment = async (
  experimentId: string
): Promise<void> => {
  await dbConnect();
  const experiment = await Experiment.findById(new ObjectId(experimentId));

  const participantGroupsCount = experiment.settings.numberOfParticipantGroups;

  const newParticipantGroupsIds: string[] = [];

  await Promise.all(
    [...Array(participantGroupsCount).keys()].map(async (__) => {
      const newParticipantGroup = new ParticipantGroupModel({
        experimentId: experimentId,
      });
      return newParticipantGroup
        .save()
        .then((res) => newParticipantGroupsIds.push(res._id.toString()));
    })
  );

  experiment.participantGroups = newParticipantGroupsIds;

  experiment.markModified("participantGroups");
  await experiment.save();
};
