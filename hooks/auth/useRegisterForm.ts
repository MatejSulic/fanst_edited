import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/auth/authContext";
import { LoggedInUserDataType, RegisterUserType } from "../../types/user";
import { registerMutationKey } from "./queries";

const useRegisterMutation = () => {
  const authContext = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

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
    onSuccess: (data: { data: LoggedInUserDataType; success: boolean }) => {
      authContext?.login(data.data);
      enqueueSnackbar("User registered successfully");
    },
  });
};

const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterUserType>();
  const registerMutation = useRegisterMutation();

  const handleRegister = async (data: RegisterUserType) => {
    registerMutation.mutate({ registerData: data });
  };

  const onSubmit = (onSave?: () => void) =>
    handleSubmit((data: RegisterUserType) => {
      handleRegister(data);
      if (onSave) onSave();
    });

  return [register, getValues, onSubmit, errors] as const;
};

export default useRegisterForm;
