export const experimentDetailQueryKey = (experimentId: string) => [
  "experiments",
  "detail",
  experimentId,
];

export const experimentListQueryKey = () => ["experiments", "list"];

export const experimentUpdateMutationKey = (experimentId: string) => [
  "experiments",
  experimentId,
  "update-mutation",
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

export const experimentInviteParticipantMutationKey = (
  experimentId: string
) => ["experiments", experimentId, "invite-participant-mutation"];
