import { BaseSyntheticEvent, createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

const UpdateSectionFormContext = createContext<
  | Pick<UseFormReturn, "register" | "setValue" | "getValues" | "watch"> & {
      onSubmit: (
        onSave?: () => void
      ) => (
        e?: BaseSyntheticEvent<object, any, any> | undefined
      ) => Promise<void>;
      data: any;
    }
>(null);
export const UpdateSectionFormContextProvider =
  UpdateSectionFormContext.Provider;

export const useUpdateSectionFormContext = () => {
  const updateSectionFormContext = useContext(UpdateSectionFormContext);

  return updateSectionFormContext;
};
