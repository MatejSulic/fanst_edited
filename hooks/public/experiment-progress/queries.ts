export const experimentProgressListQueryKey = () => [
  "public",
  "experiment-progress",
  "list",
];

export const experimentProgressDetailQueryKey = (experimentId: string) => [
  "public",
  "experiment-progress",
  "detail",
  experimentId,
];

export const experimentProgressCreateMutationKey = (experimentId: string) => [
  "public",
  "experiment-progress",
  experimentId,
  "create-mutation",
];

export const experimentProgressUpdateMutationKey = (experimentId: string) => [
  "public",
  "experiment-progress",
  experimentId,
  "update-mutation",
];
