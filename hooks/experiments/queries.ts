export const experimentDetailQueryKey = (experimentId: string) => [
  "experiments",
  "detail",
  experimentId,
];

export const experimentListQueryKey = (search?: string) =>
  ["experiments", "list"].concat(search ? [search] : []);

export const experimentUpdateMutationKey = (experimentId: string) => [
  "experiments",
  experimentId,
  "update-mutation",
];

export const experimentDeleteMutationKey = (experimentId: string) => [
  "experiments",
  experimentId,
  "delete-mutation",
];

export const experimentCreateMutationKey = () => [
  "experiments",
  "create-mutation",
];

export const experimentLockMutationKey = (experimentId: string) => [
  "experiments",
  experimentId,
  "experiment-lock-mutation",
];

export const experimentInviteParticipantMutationKey = () => [
  "experiments",
  "invite-participant-mutation",
];

export const experimentCopyMutationKey = (experimentId: string) => [
  "experiments",
  experimentId,
  "experiment-copy-mutation",
];
