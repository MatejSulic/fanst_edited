export type SectionTypeType =
  | "INTRODUCTION"
  | "2AFC"
  | "BLANK"
  | "ACKNOWLEDGEMENT";

export type SectionSettingsType = {
  questionDisplayTime: number; // time in seconds
  distanceOfImages?: number; // distance in mm (only for '2AFC' or 'Blank' type)
  imageWidth?: number; // in mm (only for '2AFC' or 'Blank' type)
  imageHeight?: number; // in mm (only for '2AFC' or 'Blank' type)
};

export type SectionType = {
  id: string;
  experimentId: string;
  title: string;
  description: string;
  type: SectionTypeType;
  questions: string[]; // question ids
  setting: SectionSettingsType;
};
