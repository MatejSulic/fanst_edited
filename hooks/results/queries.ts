export const resultsListQueryKey = () => ["results", "list"];

export const resultsExperimentResultsCsvMutation = (experimentId: string) => [
  "results",
  experimentId,
  "csv",
];
