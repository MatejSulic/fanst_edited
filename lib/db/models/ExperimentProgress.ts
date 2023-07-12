import mongoose, { Schema } from "mongoose";
import {
  ExperimentProgressType,
  QuestionResults,
  SectionResults,
} from "../../../types/experimentProgress";
import { questionTypeTypes } from "../../../types/question/questionTypes";
import { sectionTypeTypes } from "../../../types/section/sectionTypes";

const QuestionResultsSchema = new Schema<QuestionResults>(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    questionType: { type: String, enum: questionTypeTypes, required: true },
    questionPosition: { type: Number, required: true },
    // TODO:
    result: Schema.Types.Mixed,
  },
  { _id: false }
);

const SectionResultsSchema = new Schema<SectionResults>(
  {
    sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    sectionType: { type: String, enum: sectionTypeTypes, required: true },
    sectionPosition: { type: Number, required: true },
    results: { type: [QuestionResultsSchema], default: () => [] },
  },
  { _id: false }
);

const ExperimentProgressSchema = new Schema<ExperimentProgressType>({
  experimentId: {
    type: Schema.Types.ObjectId,
    ref: "Experiment",
    required: true,
  },
  participantId: {
    type: Schema.Types.ObjectId,
    ref: "Participant",
    required: true,
  },
  currentSectionIdx: { type: Number, default: 0 },
  finished: { type: Boolean, default: false },
  sectionResults: { type: [SectionResultsSchema], default: () => [] },
});

export default mongoose.models.ExperimentProgress ||
  mongoose.model("ExperimentProgress", ExperimentProgressSchema);
