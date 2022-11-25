import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { QuestionBlockCardSharedProps } from ".";
import { useUpdateSectionFormContext } from "../../../../contexts/experiments/experiment-detail/sectionDetailContext";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QuestionBlockPlainText = ({
  question,
  index,
}: QuestionBlockCardSharedProps) => {
  const router = useRouter();
  const { experimentId, sectionId } = router.query;
  const [quillValue, setQuillValue] = useState(question?.content?.text || "");
  const { register, setValue, onSubmit, errors } =
    useUpdateSectionFormContext();

  useEffect(() => {
    setValue(`questions.${question._id.toString()}.content.text`, quillValue);
  }, [quillValue, setValue, index]);

  return (
    <Box id="react-quill-container" sx={{ pb: 5 }}>
      <ReactQuill
        theme="snow"
        value={quillValue}
        onChange={setQuillValue}
        style={{ height: 200 }}
        bounds="#react-quill-container"
      />
    </Box>
  );
};

export default QuestionBlockPlainText;
