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
          // @ts-ignore
          // eslint-disable-next-line
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
              questionType: "PLAIN_TEXT",
              questionPosition: question.position,
              result: "SUBMITTED",
            })
          }
        >
          Pokračovat
        </Button>
      </Box>
    </>
  );
};

export default ExperimentQuestionPlainText;
