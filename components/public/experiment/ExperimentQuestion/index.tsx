import { useEffect } from "react";
import { useQuestionTimeLimitExceeded } from "../../../../hooks/public/experiments/useQuestionTimeLimitExceeded";
import { UpdateQuestionResultsType } from "../../../../types/experimentProgress";
import { QuestionType } from "../../../../types/question/question";
import { SectionType } from "../../../../types/section/section";
import ExperimentQuestion2AFC from "./ExperimentQuestion2AFC";
import ExperimentQuestionDrawLine from "./ExperimentQuestionDrawLine";
import ExperimentQuestionImageSelect from "./ExperimentQuestionImageSelect";
import ExperimentQuestionPlainText from "./ExperimentQuestionPlainText";
import ExperimentQuestionSingleImageTwoChoices from "./ExperimentQuestionSingleImageTwoChoices";

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
  const { questionTimeLimitExceeded } = useQuestionTimeLimitExceeded(
    section.settings.questionDisplayTime
  );

  useEffect(() => {
    if (questionTimeLimitExceeded && section.type !== "2AFC")
      submitQuestion(undefined);
  }, [questionTimeLimitExceeded]);

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
    } else if (question.type === "DRAW_LINE") {
      return (
        <ExperimentQuestionDrawLine
          question={question}
          section={section}
          submitQuestion={submitQuestion}
        />
      );
    } else if (question.type === "SINGLE_IMAGE_TWO_CHOICES") {
      return (
        <ExperimentQuestionSingleImageTwoChoices
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
