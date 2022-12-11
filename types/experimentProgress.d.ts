import { Types } from "mongoose";

export type QuestionResults = {
  questionId: Types.ObjectId;
  result: any;
};

export type SectionResults = {
  sectionId: Types.ObjectId;
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

type UpdateSectionResultsType = {
  sectionId: string;
  results: UpdateQuestionResultsType[];
};

export type UpdateExperimentProgressType = {
  sectionResults: UpdateSectionResultsType;
};
