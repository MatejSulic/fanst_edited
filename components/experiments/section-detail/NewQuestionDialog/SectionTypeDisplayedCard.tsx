import React from "react";
import { QuestionType } from "../../../../types/question/question";
import QuestionTypePlainText from "./QuestionTypePlainText";
import QuestionTypeSelectImage from "./QuestionTypeSelectImage";

type Props = {
  type: QuestionType["type"];
  onClick: () => void;
  selected: boolean;
};

const QuestionTypeDisplayedCard = ({ type, ...props }: Props) => {
  let Component = null;
  switch (type) {
    case "PLAIN_TEXT":
      Component = QuestionTypePlainText;
      break;
    case "SELECT_IMAGE":
      Component = QuestionTypeSelectImage;
      break;
    default:
      return null;
  }

  return <Component {...props} />;
};

export default QuestionTypeDisplayedCard;
