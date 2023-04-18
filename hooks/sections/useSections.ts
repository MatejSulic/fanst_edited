import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateNewSectionType,
  SectionType,
  UpdateSectionType,
} from "../../types/section/section";
import {
  experimentListQueryKey,
  experimentDetailQueryKey,
} from "../experiments/queries";
import { questionListQueryKey } from "../questions/queries";
import {
  sectionCreateMutationKey,
  sectionDeleteMutationKey,
  sectionListQueryKey,
  sectionUpdateMutationKey,
} from "./queries";

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

  return useMutation(sectionUpdateMutationKey(experimentId, sectionId), {
    mutationFn: updateSection,
    onSuccess: () => {
      queryClient.invalidateQueries(sectionListQueryKey(experimentId));
      queryClient.invalidateQueries(
        questionListQueryKey(experimentId, sectionId)
      );
    },
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

  return useMutation(sectionCreateMutationKey(experimentId), {
    mutationFn: createSection,
    onSuccess: () =>
      queryClient.invalidateQueries(sectionListQueryKey(experimentId)),
  });
};

export const useDeleteSectionMutation = (
  experimentId: string,
  sectionId: string
) => {
  const queryClient = useQueryClient();

  const deleteSection = async () => {
    await axios.delete(
      `/api/experiments/${experimentId}/sections/${sectionId}`
    );
  };

  return useMutation(sectionDeleteMutationKey(experimentId, sectionId), {
    mutationFn: deleteSection,
    onSuccess: () => {
      queryClient.invalidateQueries(sectionListQueryKey(experimentId));
      queryClient.invalidateQueries(experimentListQueryKey());
      queryClient.invalidateQueries(experimentDetailQueryKey(experimentId));
    },
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
    sectionListQueryKey(experimentId as string),
    async () => await getSections(experimentId as string),
    { enabled: experimentId !== undefined }
  );
};
