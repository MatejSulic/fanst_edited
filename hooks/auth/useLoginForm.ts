import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/auth/authContext";
import { LoggedInUserDataType, LoginUserType } from "../../types/user";
import { loginMutationKey } from "./queries";

const useLoginMutation = () => {
  const authContext = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const login = async ({ loginData }: { loginData: LoginUserType }) => {
    const { data } = await axios.post(`/api/auth/login/`, loginData);
    return data;
  };

  return useMutation(loginMutationKey(), {
    mutationFn: login,
    onSuccess: (data: { data: LoggedInUserDataType; success: boolean }) => {
      authContext?.login(data.data);
      enqueueSnackbar("User logged in sucessfully");
    },
  });
};

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserType>();
  const loginMutation = useLoginMutation();

  const handleLogin = async (data: LoginUserType) => {
    loginMutation.mutate({ loginData: data });
  };

  const onSubmit = (onSave?: () => void) =>
    handleSubmit((data: LoginUserType) => {
      handleLogin(data);
      if (onSave) onSave();
    });

  return [register, onSubmit, errors] as const;
};

export default useLoginForm;
