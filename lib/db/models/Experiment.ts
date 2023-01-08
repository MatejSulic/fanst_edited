import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import {
  ExperimentSettingsType,
  ExperimentType,
} from "../../../types/experiment";
import dbConnect from "../mongooseDb";
import Participant from "./Participant";
import ParticipantGroupModel, {
  createParticipantGroupsForExperiment,
} from "./ParticipantGroup";
import { generateImagePermutations } from "./Question";
import Section from "./Section";

const ExperimentSettingsSchema = new Schema<ExperimentSettingsType>(
  {
    maximumTimeValidity: { type: Number, default: 90 },
    numberOfParticipantGroups: { type: Number, default: 1 },
  },
  { _id: false }
);

const ExperimentSchema = new Schema<ExperimentType>({
  title: { type: String, required: true },
  description: String,
  sections: { type: [String], default: [] },
  participants: { type: [String], default: [] },
  participantGroups: { type: [String], default: [] },
  participantsPerGroups: { type: [Map], of: [String], default: () => [] },

  locked: { type: Boolean, default: false },
  settings: { type: ExperimentSettingsSchema, default: () => ({}) },
});

const ExperimentModel =
  mongoose.models.Experiment || mongoose.model("Experiment", ExperimentSchema);
export default ExperimentModel;

export const lockExperiment = async (experimentId: string): Promise<void> => {
  await dbConnect();
  let experiment = await ExperimentModel.findById(new ObjectId(experimentId));

  experiment.locked = true;
  await experiment.save();

  await createParticipantGroupsForExperiment(experimentId);

  const twoForcedChoiceSections = await Section.find({
    _id: { $in: experiment.sections },
    type: "2AFC",
  });
  const twoForcedChoiceQuestionsIds: string[] = [];
  twoForcedChoiceSections.forEach((section) =>
    twoForcedChoiceQuestionsIds.push(...section.questions)
  );

  experiment = await ExperimentModel.findById(new ObjectId(experimentId));

  await Promise.all(
    twoForcedChoiceQuestionsIds.map(async (questionId) =>
      generateImagePermutations(
        experiment.settings.numberOfParticipantGroups,
        experiment.participantGroups,
        questionId
      )
    )
  );
};

export const inviteParticipant = async (
  experimentId: string,
  participantEmail: string
) => {
  await dbConnect();
  let experiment = await ExperimentModel.findById(new ObjectId(experimentId));

  let newParticipant = new Participant({ email: participantEmail });
  newParticipant = await newParticipant.save();

  const experimentParticipantGroups = await ParticipantGroupModel.aggregate()
    .match({ experimentId: new ObjectId(experimentId) })
    .project({
      participantsCount: { $size: "$participants" },
    })
    .sort({ participantsCount: "asc" })
    .limit(1);
  const smallestParticipantGroupId = experimentParticipantGroups[0]._id;
  const smallestParticipantGroup = await ParticipantGroupModel.findById(
    smallestParticipantGroupId
  );

  smallestParticipantGroup.participants.push(newParticipant._id.toString());
  await smallestParticipantGroup.save();
  // console.log("group:", smallestParticipantGroup);

  // console.log(experiment);
  experiment.participants.push(newParticipant._id.toString());
  if (smallestParticipantGroup.participants.length === 1) {
    // first participant in the group
    experiment.participantsPerGroups.push({
      group: smallestParticipantGroupId.toString(),
      participants: [newParticipant._id.toString()],
    });
  } else {
    experiment.participantsPerGroups
      .find((obj) => obj.get("group") === smallestParticipantGroupId.toString())
      .get("participants")
      .push(newParticipant._id.toString());
    experiment.markModified("participantsPerGroups");
  }
  await experiment.save();
};
