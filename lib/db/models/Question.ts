import mongoose, { Schema } from "mongoose";
import { questionTypeTypes } from "../../../types/question";
import {
  QuestionSettingsType,
  QuestionType,
} from "../../../types/question/question";

const QuestionSettingsSchema = new Schema<QuestionSettingsType>({});

const QuestionSchema = new Schema<QuestionType>({
  experimentId: {
    type: Schema.Types.ObjectId,
    ref: "Experiment",
    required: true,
  },
  sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
  title: { type: String, default: "New Question" },
  type: { type: String, enum: questionTypeTypes, required: true },
  images: [{ type: Schema.Types.ObjectId }],

  settings: { type: QuestionSettingsSchema, default: {} },
});

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
