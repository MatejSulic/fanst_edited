import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateNewExperimentType,
  ExperimentType,
} from "../../types/experiment";

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

  return useMutation(["experiments", "experiment-create"], {
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
