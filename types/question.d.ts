export type QuestionTypeType = "PLAIN_TEXT" | "IMAGE_CHOICE";

export type QuestionSettingsType = {};

export type QuestionType = {
  id: string;
  experimentId: string;
  sectionId: string;
  title: string;
  type: QuestionTypeType;
  setting: QuestionSettingsType;
};
