import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExperimentType } from "../../../types/experiment";
import { QuestionType } from "../../../types/question";
import { SectionType } from "../../../types/section";

const getSectionQuestions = async (
  experimentId: ExperimentType["id"],
  sectionId: SectionType["id"]
): Promise<QuestionType[]> => {
  const { data } = await axios.get(
    `/api/experiments/${experimentId}/sections/${sectionId}/questions`
  );
  return data;
};

export const useSectionQuestions = (
  experimentId: ExperimentType["id"],
  sectionId: SectionType["id"]
) => {
  return useQuery(
    ["experiments", experimentId, "sections", sectionId, "questions"],
    async () => await getSectionQuestions(experimentId, sectionId)
  );
};
