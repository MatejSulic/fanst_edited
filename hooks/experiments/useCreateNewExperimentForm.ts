import { useForm } from "react-hook-form";
import { CreateNewExperimentType } from "../../types/experiment";
import { useCreateExperimentMutation } from "./useExperiments";
import type { FieldErrors } from "react-hook-form";

const useCreateNewExperimentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewExperimentType>();
  const createExperimentMutation = useCreateExperimentMutation();

  const handleCreateExperiment = async (data: CreateNewExperimentType) => {
    createExperimentMutation.mutate({ newExperimentData: data });
  };

  const onSubmit = (onSave: () => void) =>
    handleSubmit((data: CreateNewExperimentType) => {
      handleCreateExperiment(data);
      onSave();
    });

  return [register, onSubmit, errors] as const;
};

export default useCreateNewExperimentForm;
