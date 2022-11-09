import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateNewSectionType,
  SectionType,
} from "../../../types/section/section";

export const useCreateSectionMutation = (experimentId: string) => {
  const queryClient = useQueryClient();

  const createSection = async ({
    newSectionData,
  }: {
    newSectionData: CreateNewSectionType;
  }) => {
    const { data } = await axios.post(
      `/api/experiments/${experimentId}/sections`,
      newSectionData
    );
    return data;
  };

  return useMutation(["experiments", experimentId, "sections-create"], {
    mutationFn: createSection,
    onSuccess: () =>
      queryClient.invalidateQueries(["experiments", experimentId, "sections"]),
  });
};

export const useSections = (experimentId?: string) => {
  const getSections = async (experimentId?: string): Promise<SectionType[]> => {
    const { data } = await axios.get(
      `/api/experiments/${experimentId}/sections`
    );
    return data.data;
  };

  return useQuery(
    ["experiments", experimentId, "sections"],
    async () => await getSections(experimentId),
    { enabled: experimentId !== undefined }
  );
};
