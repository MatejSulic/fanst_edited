import { createContext, useContext } from "react";

type IsSectionEditableContextValueType = {
  isSectionEditable: boolean;
};

const IsSectionEditableContext =
  createContext<IsSectionEditableContextValueType>(
    {} as IsSectionEditableContextValueType
  );
export const IsSectionEditableContextProvider =
  IsSectionEditableContext.Provider;

export const useIsSectionEditableContext = () => {
  const isSectionEditableContext = useContext(IsSectionEditableContext);

  return isSectionEditableContext;
};
