import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateNewQuestionType,
  QuestionType,
} from "../../../types/question/question";

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

  return useMutation(
    ["experiments", experimentId, "sections", sectionId, "questions-create"],
    {
      mutationFn: createQuestion,
      onSuccess: () =>
        queryClient.invalidateQueries([
          "experiments",
          experimentId,
          "sections",
          sectionId,
          "questions",
        ]),
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
    ["experiments", experimentId, "sections", sectionId, "questions"],
    async () =>
      await getSectionQuestions(experimentId as string, sectionId as string),
    { enabled: experimentId !== undefined && sectionId !== undefined }
  );
};
