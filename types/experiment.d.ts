import { Types } from "mongoose";

type ExperimentSettingsType = {
  maximumTimeValidity: number; // number of minutes
  numberOfParticipantGroups: number;
};

export type ExperimentType = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  sections: Types.ObjectId[]; // section ids
  participants: Types.ObjectId[]; // participant ids

  settings: ExperimentSettingsType;
};

export type CreateNewExperimentType = Pick<
  ExperimentType,
  "title" | "description"
>;

export type UpdateExperimentType = Partial<
  Omit<ExperimentType, "_id" | "sections" | "participants">
>;
