import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSectionQuestions } from "../../../hooks/questions/useQuestions";
import {
  QuestionResults,
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

  useEffect(() => {}, [questionResults]);

  if (isLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h1">Error</Typography>;
  }

  const handleSubmitQuestion = (results?: UpdateQuestionResultsType) => {
    // submit whole section on last question
    if (currentQuestionIdx === questions.length - 1) {
      console.log("submit section");
      submitSection({
        sectionId: section._id.toString(),
        results: results ? [...questionResults, results] : [...questionResults],
      });
    } else {
      console.log("handleSubmitQuestion");
      if (results) setQuestionResults((prev) => [...prev, results]);
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardHeader
        title={<Typography variant="h6">{section.title}</Typography>}
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        <ExperimentQuestion
          key={questions[currentQuestionIdx]._id.toString()}
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
  );
};

export default ExperimentSectionCard;
