import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { saveConsentMutationKey } from "./queries";

export const useSaveConsentMutation = (
  experimentId: string,
  participantId: string
) => {
  const saveConsent = async (): Promise<void> => {
    const { data } = await axios.post(
      `/api/public/experiment-progress/${experimentId}/${participantId}/save-consent`
    );
    return data.data;
  };

  return useMutation(saveConsentMutationKey(experimentId, participantId), {
    mutationFn: saveConsent,
  });
};
