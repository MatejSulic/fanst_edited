import { Button } from "@mui/material";
import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import { ExperimentQuestionSharedProps } from ".";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ExperimentQuestionPlainText = ({
  question,
  section,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  return (
    <>
      <Box id="react-quill-container">
        <ReactQuill
          theme={null}
          value={question.content.text}
          // style={{ height: 200 }}
          bounds="#react-quill-container"
          preserveWhitespace
          readOnly
        />
      </Box>
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
