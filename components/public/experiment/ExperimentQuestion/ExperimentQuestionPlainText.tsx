import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ExperimentQuestionSharedProps } from ".";

const ExperimentQuestionPlainText = ({
  question,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  return (
    <>
      <Typography variant="body2">{question.content.text}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            submitQuestion({
              questionId: question._id.toString(),
              result: "SUBMITTED",
            })
          }
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default ExperimentQuestionPlainText;
