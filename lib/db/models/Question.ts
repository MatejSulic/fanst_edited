import mongoose, { Schema } from "mongoose";
import { questionTypeTypes } from "../../../types/question/questionTypes";
import {
  QuestionContentType,
  QuestionSettingsType,
  QuestionType,
} from "../../../types/question/question";

const QuestionSettingsSchema = new Schema<QuestionSettingsType>(
  {},
  { _id: false }
);

const QuestionContentSchema = new Schema<QuestionContentType>(
  {
    text: String,
    images: { type: [String] },
    leftImage: String,
    rightImage: String,
  },
  { _id: false }
);

const QuestionSchema = new Schema<QuestionType>({
  experimentId: {
    type: Schema.Types.ObjectId,
    ref: "Experiment",
    required: true,
  },
  sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
  title: { type: String, default: "New Question" },
  type: { type: String, enum: questionTypeTypes, required: true },
  content: { type: QuestionContentSchema, default: {} },

  settings: { type: QuestionSettingsSchema, default: {} },
});

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
