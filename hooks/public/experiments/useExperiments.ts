import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExperimentType } from "../../../types/experiment";
import {
  publicExperimentDetailQueryKey,
  publicExperimentListQueryKey,
} from "./queries";

export const usePublicExperiments = () => {
  const getExperiments = async (): Promise<ExperimentType[]> => {
    const { data } = await axios.get("/api/public/experiments");
    return data.data;
  };

  return useQuery(publicExperimentListQueryKey(), getExperiments);
};

export const usePublicExperiment = (experimentId?: string) => {
  const getExperiment = async (
    experimentId: string
  ): Promise<ExperimentType> => {
    const { data } = await axios.get(
      `/api/public/experiments/${experimentId}/`
    );
    return data.data;
  };

  return useQuery(
    publicExperimentDetailQueryKey(experimentId as string),
    async () => await getExperiment(experimentId as string),
    { enabled: experimentId !== undefined }
  );
};
