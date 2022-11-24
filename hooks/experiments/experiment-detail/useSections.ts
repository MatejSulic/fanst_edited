import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateNewSectionType,
  SectionType,
  UpdateSectionType,
} from "../../../types/section/section";

export const useUpdateSectionMutation = (
  experimentId: string,
  sectionId: string
) => {
  const queryClient = useQueryClient();

  const updateSection = async ({
    sectionData,
  }: {
    sectionData: UpdateSectionType;
  }) => {
    const { data } = await axios.patch(
      `/api/experiments/${experimentId}/sections/${sectionId}`,
      sectionData
    );
    return data.data;
  };

  return useMutation(["experiments", experimentId, "sections", sectionId], {
    mutationFn: updateSection,
    onSuccess: () =>
      queryClient.invalidateQueries(["experiments", experimentId, "sections"]),
  });
};

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
    return data.data;
  };

  return useMutation(["experiments", experimentId, "sections-create"], {
    mutationFn: createSection,
    onSuccess: () =>
      queryClient.invalidateQueries(["experiments", experimentId, "sections"]),
  });
};

export const useSections = (experimentId?: string) => {
  const getSections = async (experimentId: string): Promise<SectionType[]> => {
    const { data } = await axios.get(
      `/api/experiments/${experimentId}/sections`
    );
    return data.data;
  };

  return useQuery(
    ["experiments", experimentId, "sections"],
    async () => await getSections(experimentId as string),
    { enabled: experimentId !== undefined }
  );
};
