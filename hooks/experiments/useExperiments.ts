import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateNewExperimentType,
  ExperimentType,
  UpdateExperimentType,
} from "../../types/experiment";
import {
  experimentCreateMutationKey,
  experimentDetailQueryKey,
  experimentListQueryKey,
  experimentUpdateMutationKey,
} from "./queries";

export const useUpdateExperimentMutation = (experimentId: string) => {
  const queryClient = useQueryClient();

  const updateExperiment = async ({
    experimentData,
  }: {
    experimentData: UpdateExperimentType;
  }) => {
    const { data } = await axios.patch(
      `/api/experiments/${experimentId}`,
      experimentData
    );
    return data.data;
  };

  return useMutation(experimentUpdateMutationKey(experimentId), {
    mutationFn: updateExperiment,
    onSuccess: () => queryClient.invalidateQueries(experimentListQueryKey()),
  });
};

export const useCreateExperimentMutation = () => {
  const queryClient = useQueryClient();

  const createExperiment = async ({
    newExperimentData,
  }: {
    newExperimentData: CreateNewExperimentType;
  }) => {
    const { data } = await axios.post(`/api/experiments/`, newExperimentData);
    return data;
  };

  return useMutation(experimentCreateMutationKey(), {
    mutationFn: createExperiment,
    onSuccess: () => queryClient.invalidateQueries(experimentListQueryKey()),
  });
};

export const useExperiments = () => {
  const getExperiments = async (): Promise<ExperimentType[]> => {
    const { data } = await axios.get("/api/experiments");
    return data.data;
  };

  return useQuery(experimentListQueryKey(), getExperiments);
};

export const useExperiment = (experimentId?: string) => {
  const getExperiment = async (
    experimentId: string
  ): Promise<ExperimentType> => {
    const { data } = await axios.get(`/api/experiments/${experimentId}/`);
    return data.data;
  };

  return useQuery(
    experimentDetailQueryKey(experimentId as string),
    async () => await getExperiment(experimentId as string),
    { enabled: experimentId !== undefined }
  );
};
