import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  QuestionBlockCardSharedProps,
  QuestionBlockSpecificCardSharedProps,
} from ".";
import { useUpdateSectionFormContext } from "../../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const LockedQuestionBlockPlainText = ({
  question,
}: QuestionBlockSpecificCardSharedProps) => {
  return question.content.text ? (
    <Box id="react-quill-container" sx={{ pb: 5 }}>
      <ReactQuill
        theme={null}
        value={question.content.text}
        style={{ height: 200 }}
        bounds="#react-quill-container"
        preserveWhitespace
        readOnly
      />
    </Box>
  ) : (
    <Box
      sx={{
        height: "min-content",
        py: 4,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 1,
        borderRadius: 1,
      }}
    >
      No text
    </Box>
  );
};

const UnlockedQuestionBlockPlainText = ({
  question,
}: QuestionBlockSpecificCardSharedProps) => {
  const [quillValue, setQuillValue] = useState(question?.content?.text || "");
  const { register, setValue, onSubmit } = useUpdateSectionFormContext();

  useEffect(() => {
    setValue(`questions.${question._id.toString()}.content.text`, quillValue);
  }, [quillValue, setValue, question._id]);

  return (
    <Box id="react-quill-container" sx={{ pb: 5 }}>
      <ReactQuill
        theme="snow"
        value={quillValue}
        onChange={setQuillValue}
        style={{ height: 200 }}
        bounds="#react-quill-container"
        preserveWhitespace
      />
    </Box>
  );
};

const QuestionBlockPlainText = ({
  question,
  locked,
}: QuestionBlockCardSharedProps) => {
  return locked ? (
    <LockedQuestionBlockPlainText question={question} />
  ) : (
    <UnlockedQuestionBlockPlainText question={question} />
  );
};

export default QuestionBlockPlainText;
