import { Box } from "@mui/system";
import Image from "next/image";
import QuestionTypeCard, {
  QuestionTypeCardSharedProps,
} from "./QuestionTypeCard";

const QuestionTypeDrawLine = ({ ...props }: QuestionTypeCardSharedProps) => {
  return (
    <QuestionTypeCard
      title="Interactively draw a line in the image"
      subheader="Manually upload an image and let the participant draw a line in in."
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
      </Box>
    </QuestionTypeCard>
  );
};

export default QuestionTypeDrawLine;
