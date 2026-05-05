import { Box } from "@mui/system";
import Image from "next/image";
import QuestionTypeCard, {
  QuestionTypeCardSharedProps,
} from "./QuestionTypeCard";

const QuestionTypeSelectImage = ({ ...props }: QuestionTypeCardSharedProps) => {
  return (
    <QuestionTypeCard
      title="Select one of two images"
      subheader="Manually upload two images for the comparison."
      {...props}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 4,
        }}
      >
        <Image
          src="https://picsum.photos/120"
          alt="first image"
          width={120}
          height={120}
        />
        <Image
          src="https://picsum.photos/120"
          alt="second image"
          width={120}
          height={120}
        />
      </Box>
    </QuestionTypeCard>
  );
};

export default QuestionTypeSelectImage;
