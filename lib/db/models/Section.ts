import mongoose, { Schema } from "mongoose";
import { sectionTypeTypes } from "../../../types/section";
import {
  SectionSettingsType,
  SectionType,
} from "../../../types/section/section";

const SectionSettingsSchema = new Schema<SectionSettingsType>({
  questionDisplayTime: Number,
  distanceOfImages: Number,
  imageWidth: Number,
  imageHeight: Number,
});

const SectionSchema = new Schema<SectionType>({
  title: { type: String, default: "New Section" },
  experimentId: {
    type: Schema.Types.ObjectId,
    ref: "Experiment",
    required: true,
  },
  description: { type: String, default: "The most amazing section of all!" },
  type: { type: String, enum: sectionTypeTypes, required: true },
  settings: { type: SectionSettingsSchema, default: {} },
});

export default mongoose.models.Section ||
  mongoose.model("Section", SectionSchema);
