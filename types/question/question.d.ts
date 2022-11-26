import { Types } from "mongoose";
import { questionTypeTypes } from "./questionTypes";

type QuestionTypeType = typeof questionTypeTypes[number];

type QuestionSettingsType = {};

type QuestionContentType = {
  text?: string; // in case question is of type PLAIN_TEXT
  images?: string[];
  // in case of IMAGE_SELECT
  leftImage?: string;
  rightImage?: string;
};

export type QuestionType = {
  _id: Types.ObjectId;
  experimentId: Types.ObjectId;
  sectionId: Types.ObjectId;
  title: string;
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
