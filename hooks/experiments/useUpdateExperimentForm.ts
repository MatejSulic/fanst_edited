import { useForm } from "react-hook-form";
import { UpdateExperimentType } from "../../types/experiment";
import { useUpdateExperimentMutation } from "./useExperiments";

const useUpdateExperimentForm = (experimentId: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<UpdateExperimentType>({});
  const updateExperimentMutation = useUpdateExperimentMutation(experimentId);

  const handleCreateSection = async (data: UpdateExperimentType) => {
    updateExperimentMutation.mutate({ experimentData: data });
  };

  const onSubmit = (onSave?: () => void) =>
    handleSubmit((data: UpdateExperimentType) => {
      handleCreateSection(data);
      if (onSave) onSave();
    });

  return [register, setValue, onSubmit, reset, errors] as const;
};

export default useUpdateExperimentForm;
