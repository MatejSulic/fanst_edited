import { createContext, useContext } from "react";

const UpdateSectionFormContext = createContext(null);
export const UpdateSectionFormContextProvider =
  UpdateSectionFormContext.Provider;

export const useUpdateSectionFormContext = () => {
  const updateSectionFormContext = useContext(UpdateSectionFormContext);

  return updateSectionFormContext;
};
