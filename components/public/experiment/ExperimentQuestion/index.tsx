import { UpdateQuestionResultsType } from "../../../../types/experimentProgress";
import { QuestionType } from "../../../../types/question/question";
import ExperimentQuestion2AFC from "./ExperimentQuestion2AFC";
import ExperimentQuestionImageSelect from "./ExperimentQuestionImageSelect";
import ExperimentQuestionPlainText from "./ExperimentQuestionPlainText";

export type ExperimentQuestionSharedProps = {
  question: QuestionType;
  submitQuestion: (results?: UpdateQuestionResultsType) => void;
};

const ExperimentQuestion = ({
  question,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  const renderQuestionTypeBlock = () => {
    if (question.type === "PLAIN_TEXT") {
      return (
        <ExperimentQuestionPlainText
          question={question}
          submitQuestion={submitQuestion}
        />
      );
    } else if (question.type === "IMAGE_SELECT") {
      return (
        <ExperimentQuestionImageSelect
          question={question}
          submitQuestion={submitQuestion}
        />
      );
    } else if (question.type === "2AFC") {
      return (
        <ExperimentQuestion2AFC
          question={question}
          submitQuestion={submitQuestion}
        />
      );
    } else {
      return null;
    }
  };

  return renderQuestionTypeBlock();
};

export default ExperimentQuestion;
