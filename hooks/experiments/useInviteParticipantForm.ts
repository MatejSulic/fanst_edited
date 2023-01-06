import { useForm } from "react-hook-form";
import { InviteParticipantType } from "../../types/participant";
import { useInviteParticipantMutation } from "./useExperiments";

const useInviteParticipantForm = (experimentId: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InviteParticipantType>();
  const inviteParticipantMutation = useInviteParticipantMutation(experimentId);

  const handleInviteParticipant = async (data: InviteParticipantType) => {
    inviteParticipantMutation.mutate(data.email);
  };

  const onSubmit = (onSave?: () => void) =>
    handleSubmit((data: InviteParticipantType) => {
      handleInviteParticipant(data);
      if (onSave) onSave();
    });

  return [register, onSubmit, reset, errors] as const;
};

export default useInviteParticipantForm;
