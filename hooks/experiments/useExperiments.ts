import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateNewExperimentType,
  ExperimentType,
  UpdateExperimentType,
} from "../../types/experiment";

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

  return useMutation(["experiments", experimentId], {
    mutationFn: updateExperiment,
    onSuccess: () => queryClient.invalidateQueries(["experiments"]),
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

  return useMutation(["experiments", "create"], {
    mutationFn: createExperiment,
    onSuccess: () => queryClient.invalidateQueries(["experiments"]),
  });
};

export const useExperiments = () => {
  const getExperiments = async (): Promise<ExperimentType[]> => {
    const { data } = await axios.get("/api/experiments");
    return data.data;
  };

  return useQuery(["experiments"], getExperiments);
};
