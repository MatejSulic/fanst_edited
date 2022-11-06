import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExperimentType } from "../../types/experiment";

const getExperiments = async (): Promise<ExperimentType[]> => {
  const { data } = await axios.get("/api/experiments");
  return data;
};

export const useExperiments = () => {
  return useQuery(["experiments"], getExperiments);
};
