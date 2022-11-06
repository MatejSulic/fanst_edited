export type ExperimentSettingsType = {
  maximumTimeValidity: number; // number of minutes
  numberOfParticipantGroups: number;
};

export type ExperimentType = {
  id: string;
  title: string;
  description: string;
  sections: string[]; // section ids
  participants: string[]; // participant ids

  setting: ExperimentSettingsType;
};
