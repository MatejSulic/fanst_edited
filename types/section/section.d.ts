import { Types } from "mongoose";
import { sectionTypeTypes } from "./sectionTypes";
import { QuestionType, UpdateQuestionType } from "../question/question";

type SectionTypeType = (typeof sectionTypeTypes)[number];

type SectionSettingsType = {
  questionDisplayTime?: number; // time in seconds (indifinitely when undefined)
  imageDisplayTime?: number; // time in seconds the image is visible before hiding (indefinitely when undefined)
  preImageDelayTime?: number; // countdown in seconds before image appears (0 = no delay)
  interQuestionDelay?: number; // seconds between answer and next question (0 = show Next button)
  distanceOfImages?: number; // distance in mm (only for '2AFC' or 'Blank' type)
  imageWidth?: number; // in mm (only for '2AFC' or 'Blank' type)
  imageHeight?: number; // in mm (only for '2AFC' or 'Blank' type)
  calibrationImagePublicId?: string; // in mm (only for '2AFC' or 'Blank' type)
  calibrationTimeInSeconds?: number; // in mm (only for '2AFC' or 'Blank' type)
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
  experimentTitle: string;
};

export type UpdateSectionType = Partial<
  Omit<SectionType, "_id" | "experimentId" | "type" | "questions"> & {
    questions: { [key: string]: UpdateQuestionType };
  }
>;
