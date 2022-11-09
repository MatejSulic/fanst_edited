import SectionTypeCard, { SectionTypeCardSharedProps } from "./SectionTypeCard";

const SectionTypeBlank = ({ ...props }: SectionTypeCardSharedProps) => {
  return (
    <SectionTypeCard
      title="Blank section"
      subheader="Create a blank section. You can then e.g. add plain text questions, comparison questions etc. manually."
      {...props}
    />
  );
};

export default SectionTypeBlank;
