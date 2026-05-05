export const participantListQueryKey = (options?: object) => [
  "experiments",
  "participants",
  "list",
  options,
];

export const participantDeleteMutationKey = () => ["participants", "delete"];
