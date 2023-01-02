import { createContext, useContext } from "react";
import {
  useExperimentsSafe,
  useLockExperimentMutation,
} from "../../hooks/experiments/useExperiments";

type LockExperimentContextValueType = {
  isExperimentLocked: boolean | undefined;
  lockExperiment: () => void;
};

const LockExperimentContext = createContext<LockExperimentContextValueType>(
  {} as LockExperimentContextValueType
);
export const LockExperimentContextProvider = ({
  experimentId,
  children,
}: {
  experimentId: string;
  children: React.ReactNode;
}) => {
  const experiments = useExperimentsSafe();

  const lockExperimentMutation = useLockExperimentMutation(experimentId);
  const currentExperiment = experiments?.find(
    (item) => item._id.toString() === experimentId
  );

  const handleLockExperiment = () => {
    lockExperimentMutation.mutate();
  };

  return (
    <LockExperimentContext.Provider
      value={{
        isExperimentLocked: currentExperiment?.locked,
        lockExperiment: handleLockExperiment,
      }}
    >
      {children}
    </LockExperimentContext.Provider>
  );
};

export const useLockExperimentContext = () => {
  const lockExperimentContext = useContext(LockExperimentContext);

  return lockExperimentContext;
};
