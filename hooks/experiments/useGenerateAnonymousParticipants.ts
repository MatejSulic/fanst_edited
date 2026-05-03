import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { participantListQueryKey } from "../participants/queries";
import { experimentGenerateAnonymousParticipantsMutationKey } from "./queries";

export const useGenerateAnonymousParticipantsMutation = (
  experimentId: string
) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const generate = async (count: number): Promise<string[]> => {
    const { data } = await axios.post(
      `/api/experiments/${experimentId}/generate-anonymous-participants`,
      { count }
    );
    return data.data.participantIds;
  };

  return useMutation(
    experimentGenerateAnonymousParticipantsMutationKey(experimentId),
    {
      mutationFn: generate,
      onSuccess: () => {
        queryClient.invalidateQueries(
          participantListQueryKey({ experimentId })
        );
        enqueueSnackbar("Anonymous links generated");
      },
    }
  );
};
