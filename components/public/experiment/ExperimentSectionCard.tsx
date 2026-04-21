import { Box, Card, CardContent, CardHeader, LinearProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSectionQuestions } from "../../../hooks/questions/useQuestions";
import {
  UpdateQuestionResultsType,
  UpdateSectionResultsType,
} from "../../../types/experimentProgress";
import { SectionType } from "../../../types/section/section";
import ExperimentQuestion from "./ExperimentQuestion";

type Props = {
  section: SectionType;
  submitSection: (results: UpdateSectionResultsType) => void;
};

const ExperimentSectionCard = ({ section, submitSection }: Props) => {
  const [questionResults, setQuestionResults] = useState<
    UpdateQuestionResultsType[]
  >([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [waitCountdown, setWaitCountdown] = useState<number | null>(null);
  const pendingResultsRef = useRef<UpdateQuestionResultsType | undefined>(undefined);
  const waitIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    data: questions,
    isLoading,
    isError,
  } = useSectionQuestions(
    section.experimentId.toString(),
    section._id.toString()
  );

  useEffect(() => {
    if (questions?.length === 0) {
      submitSection({
        sectionId: section._id.toString(),
        sectionType: section.type,
        sectionPosition: section.position,
        results: [],
      });
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h1">Failed to load questions. Please try again later.</Typography>;
  }

  const advanceQuestion = (results?: UpdateQuestionResultsType) => {
    setWaitCountdown(null);
    if (currentQuestionIdx === questions.length - 1 || questions.length === 0) {
      submitSection({
        sectionId: section._id.toString(),
        sectionType: section.type,
        sectionPosition: section.position,
        results: results ? [...questionResults, results] : [...questionResults],
      });
      setQuestionResults([]);
      setCurrentQuestionIdx(0);
    } else {
      if (results) setQuestionResults((prev) => [...prev, results]);
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handleSubmitQuestion = (results?: UpdateQuestionResultsType) => {
    const interDelay = section.settings?.interQuestionDelay;
    const isLastQuestion = currentQuestionIdx === questions.length - 1 || questions.length === 0;

    if (isLastQuestion || !interDelay || interDelay <= 0) {
      advanceQuestion(results);
      return;
    }

    pendingResultsRef.current = results;
    let remaining = Math.round(interDelay);
    setWaitCountdown(remaining);
    waitIntervalRef.current = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(waitIntervalRef.current);
        advanceQuestion(pendingResultsRef.current);
      } else {
        setWaitCountdown(remaining);
      }
    }, 1000);
  };

  const progress = questions.length > 0
    ? ((currentQuestionIdx + 1) / questions.length) * 100
    : 0;

  return questions.length > 0 ? (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 1, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {currentQuestionIdx + 1} / {questions.length}
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      {waitCountdown !== null ? (
        <Box sx={{ width: "100%", minHeight: 400, backgroundColor: "white" }} />
      ) : (
        <Card variant="outlined" sx={{ width: "100%", backgroundColor: "white" }}>
          <CardHeader
            title={
              <Typography variant="h6">
                {questions[currentQuestionIdx].title}
              </Typography>
            }
            sx={{ textAlign: "center" }}
          />
          <CardContent>
            <ExperimentQuestion
              key={questions[currentQuestionIdx]._id.toString()}
              section={section}
              question={questions[currentQuestionIdx]}
              submitQuestion={handleSubmitQuestion}
            />
          </CardContent>
        </Card>
      )}
    </Box>
  ) : null;
};

export default ExperimentSectionCard;
