export const getParticipantMailtoSubjectUriEncoded = () =>
  encodeURI(`You have been invited to an experiment`);

export const getParticipantMailtoBodyUriEncoded = (
  experimentId: string,
  participantId: string
) =>
  encodeURI(
    `You have been invited to complete an experiment.
Follow this link to continue:
http://localhost:3000/public/experiment-preview/${experimentId}/${participantId}`
  );
