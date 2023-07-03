import { Types } from "mongoose";
import { questionTypeTypes } from "./questionTypes";

type QuestionTypeType = (typeof questionTypeTypes)[number];

type QuestionSettingsType = {};

type QuestionContentType = {
  // in case of PLAIN_TEXT
  text?: string;
  // in case of 2AFC
  images?: string[];
  imagePermutations?: { participantGroup: string; permutation: string[] }[]; // permutation is a list of image ids - same as `images` field
  // in case of IMAGE_SELECT
  leftImage?: string;
  rightImage?: string;
  // in case of SINGLE_IMAGE_TWO_CHOICES
  leftTextOption?: string;
  rightTextOption?: string;
};

export type QuestionType = {
  _id: Types.ObjectId;
  experimentId: Types.ObjectId;
  sectionId: Types.ObjectId;
  title: string;
  position: number;
  type: QuestionTypeType;
  content: QuestionContentType;
  settings: QuestionSettingsType;
};

export type CreateNewQuestionType = Pick<QuestionType, "type"> & {
  experimentId: string;
  sectionId: string;
};

export type UpdateQuestionType = Partial<
  Omit<QuestionType, "_id" | "experimentId" | "sectionId" | "type">
>;
