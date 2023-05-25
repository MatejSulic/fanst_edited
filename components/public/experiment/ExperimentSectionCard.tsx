import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
        results: [],
      });
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h1">Error</Typography>;
  }

  const handleSubmitQuestion = (results?: UpdateQuestionResultsType) => {
    // submit whole section on last question
    if (currentQuestionIdx === questions.length - 1 || questions.length === 0) {
      submitSection({
        sectionId: section._id.toString(),
        sectionType: section.type,
        results: results ? [...questionResults, results] : [...questionResults],
      });
      setCurrentQuestionIdx(0);
    } else {
      if (results) setQuestionResults((prev) => [...prev, results]);
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  return questions.length > 0 ? (
    <Card variant="outlined" sx={{ width: "100%" }}>
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
      {/* {(section.type === "INTRODUCTION" ||
        section.type === "ACKNOWLEDGEMENT") && (
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button variant="contained">Next</Button>
        </CardActions>
      )} */}
    </Card>
  ) : null;
};

export default ExperimentSectionCard;
