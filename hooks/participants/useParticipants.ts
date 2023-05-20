import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ParticipantType } from "../../types/participant";
import {
  participantDeleteMutationKey,
  participantListQueryKey,
} from "./queries";
import { useSnackbar } from "notistack";
import { ExperimentType } from "../../types/experiment";

type OptionsType = {
  experimentId?: string;
};

export const useParticipants = (options?: OptionsType) => {
  const getExperiments = async (): Promise<ParticipantType[]> => {
    const search = new URLSearchParams();
    if (options) {
      let key: keyof OptionsType;
      for (key in options) {
        search.append(key, options[key] as string);
      }
    }

    const { data } = await axios.get("/api/participants?" + search.toString());
    console.log("data:", data);
    return data.data;
  };

  return useQuery(participantListQueryKey(options), getExperiments, {
    enabled: !!options?.experimentId,
  });
};

export const useDeleteParticipantMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const deleteParticipant = async ({
    experimentId,
    participantId,
  }: {
    experimentId: string;
    participantId: string;
  }) => {
    const { data } = await axios.delete(
      `/api/participants/${participantId}/experiments/${experimentId}`
    );
    return data.data;
  };

  return useMutation(participantDeleteMutationKey(), {
    mutationFn: deleteParticipant,
    onSuccess: (data: ExperimentType) => {
      queryClient.invalidateQueries(
        participantListQueryKey({ experimentId: data._id.toString() })
      );
      enqueueSnackbar("Participant removed from the experiment");
    },
  });
};
