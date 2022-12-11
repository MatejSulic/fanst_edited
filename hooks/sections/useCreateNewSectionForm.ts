import { useForm } from "react-hook-form";
import { CreateNewSectionType } from "../../types/section/section";
import { useCreateSectionMutation } from "./useSections";

const useCreateNewSectionForm = (experimentId: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateNewSectionType>({
    // defaultValues: { experimentId },
  });
  const createExperimentMutation = useCreateSectionMutation(experimentId);

  const handleCreateSection = async (data: CreateNewSectionType) => {
    createExperimentMutation.mutate({ newSectionData: data });
  };

  const onSubmit = (onSave: () => void) =>
    handleSubmit((data: CreateNewSectionType) => {
      handleCreateSection(data);
      onSave();
    });

  return [register, setValue, onSubmit, errors] as const;
};

export default useCreateNewSectionForm;
