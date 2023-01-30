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

export const sectionDeleteMutationKey = (
  experimentId: string,
  sectionId: string
) => ["experiments", experimentId, "sections", sectionId, "delete-mutation"];
