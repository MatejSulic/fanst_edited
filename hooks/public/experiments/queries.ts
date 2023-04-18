export const publicExperimentDetailQueryKey = (experimentId: string) => [
  "public",
  "experiments",
  "detail",
  experimentId,
];

export const publicExperimentListQueryKey = () => [
  "public",
  "experiments",
  "list",
];
