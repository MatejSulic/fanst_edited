import mongoose, { Schema } from "mongoose";
import {
  ExperimentSettingsType,
  ExperimentType,
} from "../../../types/experiment";

const ExperimentSettingsSchema = new Schema<ExperimentSettingsType>({
  maximumTimeValidity: { type: Number, default: 90 },
  numberOfParticipantGroups: { type: Number, default: 1 },
});

const ExperimentSchema = new Schema<ExperimentType>({
  id: { type: String, auto: true },
  title: { type: String, required: true },
  description: String,
  participants: { type: [String], default: [] },
  sections: { type: [String], default: [] },
  settings: ExperimentSettingsSchema,
});

export default mongoose.model<ExperimentType>("Users", ExperimentSchema);
