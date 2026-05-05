import { Types } from "mongoose";
import { QuestionType } from "./question/question";
import { SectionType } from "./section/section";

export type QuestionResults = {
  questionId: Types.ObjectId;
  questionType: QuestionType["type"];
  questionPosition: QuestionType["position"];
  result: any;
};

export type SectionResults = {
  sectionId: Types.ObjectId;
  sectionType: SectionType["type"];
  sectionPosition: SectionType["position"];
  results: QuestionResults[];
};

export type ExperimentProgressType = {
  _id: Types.ObjectId;
  experimentId: Types.ObjectId;
  participantId: Types.ObjectId;
  currentSectionIdx: number;
  finished: boolean;
  sectionResults: SectionResults[];
};

type UpdateQuestionResultsType = Omit<QuestionResults, "questionId"> & {
  questionId: string;
};

type UpdateSectionResultsType = Omit<
  SectionResults,
  "sectionId" | "results"
> & {
  sectionId: string;
  results: UpdateQuestionResultsType[];
};

// type UpdateSectionResultsType = {
//   sectionId: string;
//   sectionType: SectionType["type"];
//   sectionPosition: SectionType["position"];
//   results: UpdateQuestionResultsType[];
// };

export type UpdateExperimentProgressType = {
  sectionResults: UpdateSectionResultsType;
};
