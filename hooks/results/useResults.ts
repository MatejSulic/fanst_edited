import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExperimentResultsDetail } from "../../types/experimentResults";
import {
  resultsExperimentResultsCsvMutation,
  resultsListQueryKey,
} from "./queries";

export const useResults = () => {
  const getResults = async (): Promise<ExperimentResultsDetail[]> => {
    const { data } = await axios.get("/api/results");
    return data.data;
  };

  return useQuery(resultsListQueryKey(), getResults);
};

export const useExperimentResultCsvMutation = (experimentId: string) => {
  const getCsv = async (experimentId: string) => {
    const { data } = await axios.post(
      `/api/results/csv?experimentId=${experimentId}`
    );
    return data.data;
  };

  return useMutation(resultsExperimentResultsCsvMutation(experimentId), {
    mutationFn: getCsv,
  });
};
