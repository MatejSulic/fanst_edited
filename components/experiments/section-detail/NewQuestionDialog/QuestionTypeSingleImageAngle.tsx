import { Slider, Stack } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import QuestionTypeCard, {
  QuestionTypeCardSharedProps,
} from "./QuestionTypeCard";

const QuestionTypeSingleImageAngle = ({
  ...props
}: QuestionTypeCardSharedProps) => {
  return (
    <QuestionTypeCard
      title="Show a single image slider"
      subheader="Manually upload an image and let the participant set angle to fit vertical axis."
      {...props}
    >
      <Stack spacing={4}>
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

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Slider disabled component={Box} />
        </Box>
      </Stack>
    </QuestionTypeCard>
  );
};

export default QuestionTypeSingleImageAngle;
