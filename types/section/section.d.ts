import { Types } from "mongoose";
import { sectionTypeTypes } from "./sectionTypes";
import { QuestionType, UpdateQuestionType } from "../question/question";

type SectionTypeType = (typeof sectionTypeTypes)[number];

type SectionSettingsType = {
  questionDisplayTime?: number; // time in seconds (indifinitely when undefined)
  distanceOfImages?: number; // distance in mm (only for '2AFC' or 'Blank' type)
  imageWidth?: number; // in mm (only for '2AFC' or 'Blank' type)
  imageHeight?: number; // in mm (only for '2AFC' or 'Blank' type)
};

export type SectionType = {
  _id: Types.ObjectId;
  experimentId: Types.ObjectId;
  title: string;
  description: string;
  position: number;
  type: SectionTypeType;
  questions: string[]; // question ids

  settings: SectionSettingsType;
};

export type CreateNewSectionType = Pick<SectionType, "type"> & {
  experimentId: string;
};

export type UpdateSectionType = Partial<
  Omit<SectionType, "_id" | "experimentId" | "type" | "questions"> & {
    questions: UpdateQuestionType[];
  }
>;
