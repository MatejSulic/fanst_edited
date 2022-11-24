import { useForm } from "react-hook-form";
import { UpdateSectionType } from "../../../types/section/section";
import { useUpdateSectionMutation } from "./useSections";

const useUpdateSectionForm = (experimentId: string, sectionId: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateSectionType>({});
  const updateExperimentMutation = useUpdateSectionMutation(
    experimentId,
    sectionId
  );

  const handleCreateSection = async (data: UpdateSectionType) => {
    updateExperimentMutation.mutate({ sectionData: data });
  };

  const onSubmit = (onSave?: () => void) =>
    handleSubmit((data: UpdateSectionType) => {
      handleCreateSection(data);
      if (onSave) onSave();
    });

  return [register, setValue, onSubmit, errors] as const;
};

export default useUpdateSectionForm;
