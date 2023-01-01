import mongoose, { Schema } from "mongoose";
import {
  ExperimentSettingsType,
  ExperimentType,
} from "../../../types/experiment";

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
  participants: { type: [String] },
  settings: ExperimentSettingsSchema,
});

export default mongoose.models.Experiment ||
  mongoose.model("Experiment", ExperimentSchema);
