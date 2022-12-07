import mongoose, { Schema } from "mongoose";
import {
  ExperimentProgressType,
  QuestionResults,
  SectionResults,
} from "../../../types/experimentProgress";

const QuestionResultsSchema = new Schema<QuestionResults>(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    // TODO:
    // result:
  },
  { _id: false }
);

const SectionResultsSchema = new Schema<SectionResults>(
  {
    sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    results: { type: [QuestionResultsSchema], default: [] },
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
    // TODO:
    // ref: "Experiment",
    // required: true,
  },
  currentSectionIdx: { type: Number, default: 0 },
  sectionResults: { type: [SectionResultsSchema], default: [] },
});

export default mongoose.models.ExperimentProgress ||
  mongoose.model("ExperimentProgress", ExperimentProgressSchema);
