import { useForm } from "react-hook-form";
import { CreateNewQuestionType } from "../../../types/question/question";
import { useCreateQuestionMutation } from "./useQuestions";

const useCreateNewQuestionForm = (experimentId: string, sectionId: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateNewQuestionType>({
    defaultValues: { experimentId, sectionId },
  });
  const createExperimentMutation = useCreateQuestionMutation(
    experimentId,
    sectionId
  );

  const handleCreateSection = async (data: CreateNewQuestionType) => {
    createExperimentMutation.mutate({ newQuestionData: data });
  };

  const onSubmit = (onSave: () => void) =>
    handleSubmit((data: CreateNewQuestionType) => {
      handleCreateSection(data);
      onSave();
    });

  return [register, setValue, onSubmit, errors] as const;
};

export default useCreateNewQuestionForm;
