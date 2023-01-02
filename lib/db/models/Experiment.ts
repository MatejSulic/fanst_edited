import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import {
  ExperimentSettingsType,
  ExperimentType,
} from "../../../types/experiment";
import dbConnect from "../mongooseDb";
import { createParticipantGroupsForExperiment } from "./ParticipantGroup";
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
