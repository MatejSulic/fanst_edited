import { Types } from "mongoose";
import { questionTypeTypes } from ".";

type QuestionTypeType = typeof questionTypeTypes[number];

type QuestionSettingsType = {};

export type QuestionType = {
  _id: Types.ObjectId;
  experimentId: Types.ObjectId;
  sectionId: Types.ObjectId;
  title: string;
  type: QuestionTypeType;
  images: Types.ObjectId[]; // images associated with the question

  settings: QuestionSettingsType;
};

export type CreateNewQuestionType = Pick<QuestionType, "type"> & {
  experimentId: string;
  sectionId: string;
};
