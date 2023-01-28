import { UpdateQuestionResultsType } from "../../../../types/experimentProgress";
import { QuestionType } from "../../../../types/question/question";
import { SectionType } from "../../../../types/section/section";
import ExperimentQuestion2AFC from "./ExperimentQuestion2AFC";
import ExperimentQuestionImageSelect from "./ExperimentQuestionImageSelect";
import ExperimentQuestionPlainText from "./ExperimentQuestionPlainText";

export type ExperimentQuestionSharedProps = {
  question: QuestionType;
  section: SectionType;
  submitQuestion: (results?: UpdateQuestionResultsType) => void;
};

const ExperimentQuestion = ({
  question,
  section,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  const renderQuestionTypeBlock = () => {
    if (question.type === "PLAIN_TEXT") {
      return (
        <ExperimentQuestionPlainText
          question={question}
          section={section}
          submitQuestion={submitQuestion}
        />
      );
    } else if (question.type === "IMAGE_SELECT") {
      return (
        <ExperimentQuestionImageSelect
          question={question}
          section={section}
          submitQuestion={submitQuestion}
        />
      );
    } else if (question.type === "2AFC") {
      return (
        <ExperimentQuestion2AFC
          question={question}
          section={section}
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
