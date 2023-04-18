import { useForm } from "react-hook-form";
import { UpdateSectionType } from "../../types/section/section";
import { useUpdateSectionMutation } from "./useSections";

const useUpdateSectionForm = (experimentId: string, sectionId: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<UpdateSectionType>({});
  const updateSectionMutation = useUpdateSectionMutation(
    experimentId,
    sectionId
  );

  const handleUpdateSection = async (data: UpdateSectionType) => {
    updateSectionMutation.mutate({ sectionData: data });
  };

  const onSubmit = (onSave?: () => void) =>
    handleSubmit((data: UpdateSectionType) => {
      handleUpdateSection(data);
      if (onSave) onSave();
    });

  return {
    register,
    setValue,
    onSubmit,
    reset,
    errors,
    data: updateSectionMutation.data,
  };
};

export default useUpdateSectionForm;
