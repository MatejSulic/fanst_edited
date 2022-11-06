export type QuestionTypeType = "PLAIN_TEXT" | "IMAGE_CHOICE" | "2AFC";

export type QuestionSettingsType = {};

export type QuestionType = {
  id: string;
  sectionId: string;
  title: string;
  type: QuestionTypeType;
  images: string[]; // images associated with the question

  settings: QuestionSettingsType;
};
