export const experimentProgressListQueryKey = () => [
  "public",
  "experiment-progress",
  "list",
];

export const experimentProgressDetailQueryKey = (
  experimentId: string,
  participantId: string
) => ["public", "experiment-progress", "detail", experimentId, participantId];

export const experimentProgressCreateMutationKey = (
  experimentId: string,
  participantId: string
) => [
  "public",
  "experiment-progress",
  experimentId,
  participantId,
  "create-mutation",
];

export const experimentProgressUpdateMutationKey = (
  experimentId: string,
  participantId: string
) => [
  "public",
  "experiment-progress",
  experimentId,
  participantId,
  "update-mutation",
];

export const withdrawConsentMutationKey = (
  experimentId: string,
  participantId: string
) => [
  "public",
  "experiment-progress",
  experimentId,
  participantId,
  "withdraw-consent-mutation",
];

export const saveConsentMutationKey = (
  experimentId: string,
  participantId: string
) => [
  "public",
  "experiment-progress",
  experimentId,
  participantId,
  "save-consent-mutation",
];
