import { useEffect, useState } from "react";

export const useQuestionTimeLimit = (timeLimit?: number) => {
  const [questionTimeLimitExceeded, setQuestionTimeLimitExceeded] =
    useState(false);

  useEffect(() => {
    if (timeLimit)
      setTimeout(() => setQuestionTimeLimitExceeded(true), timeLimit * 1000);
  }, []);

  if (timeLimit === undefined) {
    return false;
  }

  return questionTimeLimitExceeded;
};
