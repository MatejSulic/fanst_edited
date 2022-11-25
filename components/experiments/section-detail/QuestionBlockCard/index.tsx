import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { useUpdateSectionFormContext } from "../../../../contexts/experiments/experiment-detail/sectionDetailContext";
import { QuestionType } from "../../../../types/question/question";
import QuestionBlockImageSelect from "./QuestionBlockImageSelect";
import QuestionBlockPlainText from "./QuestionBlockPlainText";

export type QuestionBlockCardSharedProps = {
  question: QuestionType;
  index: number;
};

const QuestionBlockCard = ({
  question,
  index,
}: QuestionBlockCardSharedProps) => {
  const { register, setValue, onSubmit, errors } =
    useUpdateSectionFormContext();

  const renderQuestionTypeBlock = () => {
    if (question.type === "PLAIN_TEXT") {
      return <QuestionBlockPlainText question={question} index={index} />;
    } else if (question.type === "IMAGE_SELECT") {
      return <QuestionBlockImageSelect question={question} index={index} />;
    } else {
      return null;
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              label="Question title"
              defaultValue={question.title}
              size="small"
              {...register(`questions.${question._id.toString()}.title`)}
            />
          </Box>
        }
      />
      <CardContent>{renderQuestionTypeBlock()}</CardContent>
    </Card>
  );
};

export default QuestionBlockCard;
