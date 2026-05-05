import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  experimentProgressDetailQueryKey,
  experimentProgressListQueryKey,
  withdrawConsentMutationKey,
} from "./queries";

export const useWithdrawConsentMutation = (
  experimentId: string,
  participantId: string
) => {
  const queryClient = useQueryClient();

  const withdrawConsent = async (): Promise<void> => {
    const { data } = await axios.post(
      `/api/public/experiment-progress/${experimentId}/${participantId}/withdraw-consent`
    );
    return data.data;
  };

  return useMutation(withdrawConsentMutationKey(experimentId, participantId), {
    mutationFn: withdrawConsent,
    onSuccess: () => {
      queryClient.invalidateQueries(experimentProgressListQueryKey());
      queryClient.invalidateQueries(
        experimentProgressDetailQueryKey(experimentId, participantId)
      );
    },
  });
};
