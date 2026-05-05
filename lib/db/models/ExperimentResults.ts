import mongoose, { Schema } from "mongoose";
import {
  ExperimentQuestionResults,
  ExperimentResults,
  ExperimentSectionResults,
} from "../../../types/experimentResults";
import { questionTypeTypes } from "../../../types/question/questionTypes";
import { sectionTypeTypes } from "../../../types/section/sectionTypes";

const ExperimentQuestionResultsSchema = new Schema<ExperimentQuestionResults>(
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

const ExperimentSectionResultsSchema = new Schema<ExperimentSectionResults>(
  {
    sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    sectionType: { type: String, enum: sectionTypeTypes, required: true },
    sectionPosition: { type: Number, required: true },
    results: { type: [ExperimentQuestionResultsSchema], default: () => [] },
  },
  { _id: false }
);

const ExperimentResultsSchema = new Schema<ExperimentResults>({
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
  experimentProgressId: {
    type: Schema.Types.ObjectId,
    ref: "ExperimentProgress",
    required: true,
  },
  sectionResults: { type: [ExperimentSectionResultsSchema], default: () => [] },
});

const ExperimentResultsModel =
  mongoose.models.ExperimentResults ||
  mongoose.model("ExperimentResults", ExperimentResultsSchema);
export default ExperimentResultsModel;
