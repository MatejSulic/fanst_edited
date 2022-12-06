export const sectionDetailQueryKey = (
  experimentId: string,
  sectionId: string
) => ["experiments", experimentId, "sections", "detail", sectionId];

export const sectionListQueryKey = (experimentId: string) => [
  "experiments",
  experimentId,
  "sections",
  "list",
];

export const sectionUpdateMutationKey = (
  experimentId: string,
  sectionId: string
) => ["experiments", experimentId, "sections", sectionId, "update-mutation"];

export const sectionCreateMutationKey = (experimentId: string) => [
  "experiments",
  experimentId,
  "sections",
  "create-mutation",
];

export const questionListQueryKey = (
  experimentId: string,
  sectionId: string
) => ["experiments", experimentId, "sections", sectionId, "questions", "list"];

export const questionCreateMutationKey = (
  experimentId: string,
  sectionId: string
) => [
  "experiments",
  experimentId,
  "sections",
  sectionId,
  "questions",
  "create-mutation",
];

export const questionDeleteMutationKey = (
  experimentId: string,
  sectionId: string,
  questionId: string
) => [
  "experiments",
  experimentId,
  "sections",
  sectionId,
  "questions",
  questionId,
  "delete-mutation",
];
