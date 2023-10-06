import React from "react";
import { QuestionType } from "../../../../types/question/question";
import QuestionTypePlainText from "./QuestionTypePlainText";
import QuestionTypeSelectImage from "./QuestionTypeSelectImage";
import QuestionTypeDrawLine from "./QuestionTypeDrawLine";
import QuestionTypeSingleImageTwoChoices from "./QuestionTypeSingleImageTwoChoices";
import QuestionTypeSingleImageAngle from "./QuestionTypeSingleImageAngle";
import QuestionTypeSingleImageInputValue from "./QuestionTypeSingleImageInputValue";
import QuestionTypeSingleImageTwoChoicesCalibration from "./QuestionTypeSingleImageTwoChoicesCalibration";

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
    case "IMAGE_SELECT":
      Component = QuestionTypeSelectImage;
      break;
    case "DRAW_LINE":
      Component = QuestionTypeDrawLine;
      break;
    case "SINGLE_IMAGE_TWO_CHOICES":
      Component = QuestionTypeSingleImageTwoChoices;
      break;
    case "SINGLE_IMAGE_ANGLE":
      Component = QuestionTypeSingleImageAngle;
      break;
    case "SINGLE_IMAGE_INPUT_VALUE":
      Component = QuestionTypeSingleImageInputValue;
      break;
      case "SINGLE_IMAGE_TWO_CHOICES_CALIBRATION":
        Component = QuestionTypeSingleImageTwoChoicesCalibration;
        break;
      default:
      return null;
  }

  return <Component {...props} />;
};

export default QuestionTypeDisplayedCard;
