import { Types } from "mongoose";

type ExperimentSettingsType = {
  maximumTimeValidity: number; // number of minutes
  numberOfParticipantGroups: number;
};

export type ExperimentType = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  sections: string[]; // section ids
  participants: string[]; // participant ids
  participantGroups: string[]; // participantGroup ids
  participantsPerGroups: {
    group: string;
    participants: string[];
  }[];

  locked: boolean; // locked experiment cannot be further edited - create participant groups, question permutations etc. on lock
  settings: ExperimentSettingsType;
};

export type CreateNewExperimentType = Pick<
  ExperimentType,
  "title" | "description"
>;

export type UpdateExperimentType = Partial<
  Pick<ExperimentType, "title" | "description" | "settings">
>;
