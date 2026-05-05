import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import QuestionTypeCard, {
  QuestionTypeCardSharedProps,
} from "./QuestionTypeCard";

const QuestionTypeSingleImageTwoChoices = ({
  ...props
}: QuestionTypeCardSharedProps) => {
  return (
    <QuestionTypeCard
      title="Show a single image with two answer choices"
      subheader="Manually upload an image and let the participant choice exactly one of two answers."
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
          <Button disabled variant="outlined" component={Box}>
            Choice 1
          </Button>
          <Button disabled variant="outlined" component={Box}>
            Choice 2
          </Button>
        </Box>
      </Stack>
    </QuestionTypeCard>
  );
};

export default QuestionTypeSingleImageTwoChoices;
