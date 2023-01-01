import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RegisterUserType } from "../../types/user";
import { registerMutationKey } from "./queries";

const useRegisterMutation = () => {
  const register = async ({
    registerData,
  }: {
    registerData: RegisterUserType;
  }) => {
    const { data } = await axios.post(`/api/auth/register/`, registerData);
    return data;
  };

  return useMutation(registerMutationKey(), {
    mutationFn: register,
  });
};

const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterUserType>();
  const loginMutation = useRegisterMutation();

  const handleRegister = async (data: RegisterUserType) => {
    loginMutation.mutate({ registerData: data });
  };

  const onSubmit = (onSave?: () => void) =>
    handleSubmit((data: RegisterUserType) => {
      handleRegister(data);
      if (onSave) onSave();
    });

  return [register, getValues, onSubmit, errors] as const;
};

export default useRegisterForm;
