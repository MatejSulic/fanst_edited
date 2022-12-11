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

export const useUpdateExperimentProgressMutation = (experimentId: string) => {
  const queryClient = useQueryClient();

  const updateExperimentProgress = async ({
    experimentProgressData,
  }: {
    experimentProgressData: UpdateExperimentProgressType;
  }): Promise<ExperimentProgressType> => {
    const { data } = await axios.patch(
      `/api/public/experiment-progress/${experimentId}`,
      experimentProgressData
    );
    return data.data;
  };

  return useMutation(experimentProgressUpdateMutationKey(experimentId), {
    mutationFn: updateExperimentProgress,
    onSuccess: () =>
      queryClient.invalidateQueries(
        experimentProgressDetailQueryKey(experimentId)
      ),
  });
};

export const useCreateExperimentProgressMutation = (experimentId: string) => {
  const queryClient = useQueryClient();

  const createExperimentProgress = async ({
    experimentId,
  }: {
    experimentId: string;
  }): Promise<ExperimentProgressType> => {
    const { data } = await axios.post(
      `/api/public/experiment-progress/${experimentId}`,
      experimentId
    );
    return data.data;
  };

  return useMutation(experimentProgressCreateMutationKey(experimentId), {
    mutationFn: createExperimentProgress,
    onSuccess: () =>
      queryClient.invalidateQueries(
        experimentProgressDetailQueryKey(experimentId)
      ),
  });
};

export const useExperimentProgresses = () => {
  const getExperimentProgresses = async (): Promise<
    ExperimentProgressType[]
  > => {
    const { data } = await axios.get("/api/public/experiment-progress");
    return data.data;
  };

  return useQuery(experimentProgressListQueryKey(), getExperimentProgresses);
};

// TODO: filter by participantId
export const useExperimentProgress = (experimentId?: string) => {
  const getExperimentProgress = async (
    experimentId: string
  ): Promise<ExperimentProgressType> => {
    const { data } = await axios.get(
      `/api/public/experiment-progress/${experimentId}`
    );
    return data.data;
  };

  return useQuery(
    experimentProgressDetailQueryKey(experimentId as string),
    async () => await getExperimentProgress(experimentId as string),
    { enabled: experimentId !== undefined }
  );
};
