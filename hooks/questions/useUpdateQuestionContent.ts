import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { QuestionContentType } from "../../types/question/question";
import { UpdateSectionType } from "../../types/section/section";
import { sectionUpdateMutationKey } from "../sections/queries";
import { questionListQueryKey } from "./queries";

export const useUpdateQuestionContent = (
  experimentId: string,
  sectionId: string,
  questionId: string
) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const updateSection = async ({
    questionContent,
  }: {
    questionContent: QuestionContentType;
  }) => {
    const sectionData: UpdateSectionType = {
      questions: { [questionId]: { content: questionContent } },
    };
    const { data } = await axios.patch(
      `/api/experiments/${experimentId}/sections/${sectionId}`,
      sectionData
    );
    return data.data;
  };

  return useMutation(sectionUpdateMutationKey(experimentId, sectionId), {
    mutationFn: updateSection,
    onSuccess: () => {
      queryClient.invalidateQueries(
        questionListQueryKey(experimentId, sectionId)
      );
      enqueueSnackbar("Question content saved");
    },
  });
};
