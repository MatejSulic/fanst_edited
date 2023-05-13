import mongoose, { Schema } from "mongoose";
import {
  SectionSettingsType,
  SectionType,
} from "../../../types/section/section";
import { sectionTypeTypes } from "../../../types/section/sectionTypes";

const SectionSettingsSchema = new Schema<SectionSettingsType>(
  {
    questionDisplayTime: Number,
    distanceOfImages: Number,
    imageWidth: { type: Number, default: 10 },
    imageHeight: { type: Number, default: 10 },
  },
  { _id: false }
);

const SectionSchema = new Schema<SectionType>({
  title: { type: String, default: "New Section" },
  experimentId: {
    type: Schema.Types.ObjectId,
    ref: "Experiment",
    required: true,
  },
  description: { type: String, default: "The most amazing section of all!" },
  type: { type: String, enum: sectionTypeTypes, required: true },
  questions: { type: [String], default: [] },

  settings: { type: SectionSettingsSchema, default: () => ({}) },
});

export default mongoose.models.Section ||
  mongoose.model("Section", SectionSchema);
