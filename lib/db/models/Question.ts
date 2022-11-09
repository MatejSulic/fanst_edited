import mongoose, { Schema } from "mongoose";
import { questionTypeTypes } from "../../../types/question";
import {
  QuestionSettingsType,
  QuestionType,
} from "../../../types/question/question";

const QuestionSettingsSchema = new Schema<QuestionSettingsType>({});

const QuestionSchema = new Schema<QuestionType>({
  sectionId: { type: Schema.Types.ObjectId, ref: "Section" },
  title: { type: String, required: true },
  type: { type: String, enum: questionTypeTypes, required: true },
  images: [{ type: Schema.Types.ObjectId }],

  settings: QuestionSettingsSchema,
});

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
