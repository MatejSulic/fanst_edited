import { Types } from "mongoose";

type QuestionResults = {
  questionId: Types.ObjectId;
  result: any;
};

type SectionResults = {
  sectionId: Types.ObjectId;
  results: QuestionResults[];
};

export type ExperimentProgressType = {
  _id: Types.ObjectId;
  experimentId: Types.ObjectId;
  participantId: Types.ObjectId;
  currentSectionIdx: number;
  sectionResults: SectionResults[];
};
