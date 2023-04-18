import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ExperimentProgressType,
  UpdateExperimentProgressType,
} from "../../../types/experimentProgress";
import {
  experimentProgressListQueryKey,
  experimentProgressDetailQueryKey,
  experimentProgressCreateMutationKey,
  experimentProgressUpdateMutationKey,
} from "./queries";

export const useUpdateExperimentProgressMutation = (
  experimentId: string,
  participantId: string
) => {
  const queryClient = useQueryClient();

  const updateExperimentProgress = async (
    experimentProgressData: UpdateExperimentProgressType
  ): Promise<ExperimentProgressType> => {
    const { data } = await axios.patch(
      `/api/public/experiment-progress/${experimentId}/${participantId}`,
      experimentProgressData
    );
    return data.data;
  };

  return useMutation(
    experimentProgressUpdateMutationKey(experimentId, participantId),
    {
      mutationFn: updateExperimentProgress,
      onSuccess: () =>
        queryClient.invalidateQueries(
          experimentProgressDetailQueryKey(experimentId, participantId)
        ),
    }
  );
};

export const useCreateExperimentProgressMutation = (
  experimentId: string,
  participantId: string
) => {
  const queryClient = useQueryClient();

  const createExperimentProgress =
    async (): Promise<ExperimentProgressType> => {
      const { data } = await axios.post(
        `/api/public/experiment-progress/${experimentId}/${participantId}`
      );
      return data.data;
    };

  return useMutation(
    experimentProgressCreateMutationKey(experimentId, participantId),
    {
      mutationFn: createExperimentProgress,
      onSuccess: () => {
        queryClient.invalidateQueries(experimentProgressListQueryKey());
        queryClient.invalidateQueries(
          experimentProgressDetailQueryKey(experimentId, participantId)
        );
      },
    }
  );
};

export const usePublicExperimentProgresses = () => {
  const getExperimentProgresses = async (): Promise<
    ExperimentProgressType[]
  > => {
    const { data } = await axios.get("/api/public/experiment-progress");
    return data.data;
  };

  return useQuery(experimentProgressListQueryKey(), getExperimentProgresses);
};

export const usePublicExperimentProgress = (
  experimentId?: string,
  participantId?: string
) => {
  const getExperimentProgress = async (
    experimentId: string,
    participantId: string
  ): Promise<ExperimentProgressType> => {
    const { data } = await axios.get(
      `/api/public/experiment-progress/${experimentId}/${participantId}`
    );
    return data.data;
  };

  return useQuery(
    experimentProgressDetailQueryKey(
      experimentId as string,
      participantId as string
    ),
    async () =>
      await getExperimentProgress(
        experimentId as string,
        participantId as string
      ),
    { enabled: experimentId !== undefined && participantId !== undefined }
  );
};
