import { useEffect, useRef, useState } from "react";

export const useQuestionTimeLimitExceeded = (timeLimit?: number) => {
  const [questionTimeLimitExceeded, setQuestionTimeLimitExceeded] =
    useState(false);
  const timerRef = useRef(null);

  const resetTimeLimit = () => {
    if (timerRef.current) {
      setQuestionTimeLimitExceeded(false);
      clearTimeout(timerRef.current);
    }

    timerRef.current = timeLimit
      ? setTimeout(() => setQuestionTimeLimitExceeded(true), timeLimit * 1000)
      : null;
  };

  useEffect(() => {
    resetTimeLimit();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (timeLimit === undefined) {
    return { questionTimeLimitExceeded: false, resetTimeLimit: () => {} };
  }

  return { questionTimeLimitExceeded, resetTimeLimit };
};
