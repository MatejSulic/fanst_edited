import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateNewQuestionType,
  QuestionType,
} from "../../../types/question/question";
import {
  questionCreateMutationKey,
  questionDeleteMutationKey,
  questionListQueryKey,
} from "./queries";

export const useCreateQuestionMutation = (
  experimentId: string,
  sectionId: string
) => {
  const queryClient = useQueryClient();

  const createQuestion = async ({
    newQuestionData,
  }: {
    newQuestionData: CreateNewQuestionType;
  }) => {
    const { data } = await axios.post(
      `/api/experiments/${experimentId}/sections/${sectionId}/questions`,
      newQuestionData
    );
    return data.data;
  };

  return useMutation(questionCreateMutationKey(experimentId, sectionId), {
    mutationFn: createQuestion,
    onSuccess: () =>
      queryClient.invalidateQueries(
        questionListQueryKey(experimentId, sectionId)
      ),
  });
};

export const useDeleteQuestionMutation = (
  experimentId: string,
  sectionId: string,
  questionId: string
) => {
  const queryClient = useQueryClient();

  const deleteQuestion = async () => {
    await axios.delete(
      `/api/experiments/${experimentId}/sections/${sectionId}/questions/${questionId}`
    );
  };

  return useMutation(
    questionDeleteMutationKey(experimentId, sectionId, questionId),
    {
      mutationFn: deleteQuestion,
      onSuccess: () =>
        queryClient.invalidateQueries(
          questionListQueryKey(experimentId, sectionId)
        ),
    }
  );
};

export const useSectionQuestions = (
  experimentId?: string,
  sectionId?: string
) => {
  const getSectionQuestions = async (
    experimentId: string,
    sectionId: string
  ): Promise<QuestionType[]> => {
    const { data } = await axios.get(
      `/api/experiments/${experimentId}/sections/${sectionId}/questions`
    );
    return data.data;
  };

  return useQuery(
    questionListQueryKey(experimentId as string, sectionId as string),
    async () =>
      await getSectionQuestions(experimentId as string, sectionId as string),
    { enabled: experimentId !== undefined && sectionId !== undefined }
  );
};
