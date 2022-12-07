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
