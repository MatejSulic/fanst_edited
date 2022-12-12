import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  experimentProgressDetailQueryKey,
  withdrawConsentMutationKey,
} from "./queries";

export const useWithdrawConsentMutation = (experimentId: string) => {
  const queryClient = useQueryClient();

  const withdrawConsent = async (): Promise<void> => {
    const { data } = await axios.post(
      `/api/public/experiment-progress/${experimentId}/withdraw-consent`
    );
    return data.data;
  };

  return useMutation(withdrawConsentMutationKey(experimentId), {
    mutationFn: withdrawConsent,
    onSuccess: () =>
      queryClient.invalidateQueries(
        experimentProgressDetailQueryKey(experimentId)
      ),
  });
};
