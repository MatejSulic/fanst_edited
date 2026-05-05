import React from "react";
import { SectionType } from "../../../../types/section/section";
import SectionType2AFC from "./SectionType2AFC";
import SectionTypeAcknowledgement from "./SectionTypeAcknowledgement";
import SectionTypeBlank from "./SectionTypeBlank";
import SectionTypeIntroduction from "./SectionTypeIntroduction";

type Props = {
  type: SectionType["type"];
  onClick: () => void;
  selected: boolean;
};

const SectionTypeDisplayedCard = ({ type, ...props }: Props) => {
  let Component = null;
  switch (type) {
    case "INTRODUCTION":
      Component = SectionTypeIntroduction;
      break;
    case "2AFC":
      Component = SectionType2AFC;
      break;
    case "BLANK":
      Component = SectionTypeBlank;
      break;
    case "ACKNOWLEDGEMENT":
      Component = SectionTypeAcknowledgement;
      break;
    default:
      return null;
  }

  return <Component {...props} />;
};

export default SectionTypeDisplayedCard;
