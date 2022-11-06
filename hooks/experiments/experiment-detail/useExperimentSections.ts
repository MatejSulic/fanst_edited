import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExperimentType } from "../../../types/experiment";
import { SectionType } from "../../../types/section";

const getExperimentSections = async (
  experimentId: ExperimentType["id"]
): Promise<SectionType[]> => {
  const { data } = await axios.get(`/api/experiments/${experimentId}/sections`);
  return data;
};

export const useExperimentSections = (experimentId: ExperimentType["id"]) => {
  return useQuery(
    ["experiments", experimentId, "sections"],
    async () => await getExperimentSections(experimentId)
  );
};
