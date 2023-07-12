import { Types } from "mongoose";
import { ExperimentType } from "./experiment";
import { SectionResults } from "./experimentProgress";
import { QuestionType } from "./question/question";
import { SectionType } from "./section/section";

export type ExperimentQuestionResults = {
  questionId: Types.ObjectId;
  questionType: QuestionType["type"];
  questionPosition: QuestionType["position"];
  result: any;
};

export type ExperimentSectionResults = {
  sectionId: Types.ObjectId;
  sectionType: SectionType["type"];
  sectionPosition: SectionType["position"];
  results: ExperimentQuestionResults[];
};

export type ExperimentResults = {
  _id: Types.ObjectId;
  experimentId: Types.ObjectId;
  participantId: Types.ObjectId;
  experimentProgressId: Types.ObjectId;
  sectionResults: ExperimentSectionResults[];
};

export type ExperimentResultsDetail = ExperimentType & {
  results: ExperimentResults[];
};
