import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QuestionType } from "../../../types/question/question";

const getSectionQuestions = async (
  experimentId: string,
  sectionId: string
): Promise<QuestionType[]> => {
  const { data } = await axios.get(
    `/api/experiments/${experimentId}/sections/${sectionId}/questions`
  );
  return data;
};

export const useSectionQuestions = (
  experimentId: string,
  sectionId: string
) => {
  return useQuery(
    ["experiments", experimentId, "sections", sectionId, "questions"],
    async () => await getSectionQuestions(experimentId, sectionId)
  );
};
