import { useForm } from "react-hook-form";
import { InviteParticipantType } from "../../types/participant";
import { useInviteParticipantMutation } from "./useExperiments";

const useInviteParticipantForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<InviteParticipantType>();
  const inviteParticipantMutation = useInviteParticipantMutation();

  const handleInviteParticipant = async (data: InviteParticipantType) => {
    inviteParticipantMutation.mutate({
      experimentId: data.experimentId,
      email: data.email,
    });
  };

  const onSubmit = (onSave?: () => void) =>
    handleSubmit((data: InviteParticipantType) => {
      handleInviteParticipant(data);
      if (onSave) onSave();
    });

  return { register, onSubmit, reset, setValue, errors };
};

export default useInviteParticipantForm;
