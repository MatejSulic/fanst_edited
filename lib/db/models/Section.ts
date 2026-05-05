import mongoose, { Schema } from "mongoose";
import {
  SectionSettingsType,
  SectionType,
} from "../../../types/section/section";
import { sectionTypeTypes } from "../../../types/section/sectionTypes";

const SectionSettingsSchema = new Schema<SectionSettingsType>(
  {
    questionDisplayTime: Number,
    imageDisplayTime: Number,
    preImageDelayTime: Number,
    interQuestionDelay: Number,
    distanceOfImages: Number,
    imageWidth: { type: Number, default: 10 },
    imageHeight: { type: Number, default: 10 },
    calibrationImagePublicId: { type: String }, //string; // in mm (only for '2AFC' or 'Blank' type)
    calibrationTimeInSeconds: { type: Number, default: 1.5 }, // in mm (only for '2AFC' or 'Blank' type)
  },
  { _id: false }
);

const SectionSchema = new Schema<SectionType>({
  experimentId: {
    type: Schema.Types.ObjectId,
    ref: "Experiment",
    required: true,
  },
  title: { type: String, default: "Section Title" },
  description: {
    type: String,
    default: "Here goes your section description...",
  },
  // position of the section between experiment sections
  position: { type: Number },
  type: { type: String, enum: sectionTypeTypes, required: true },
  questions: { type: [String], default: [] },

  settings: { type: SectionSettingsSchema, default: () => ({}) },
});

export default mongoose.models.Section ||
  mongoose.model("Section", SectionSchema);
