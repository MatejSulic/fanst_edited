import { Box } from "@mui/material";
import Image from "next/image";
import { QuestionBlockCardSharedProps } from ".";

const QuestionBlockImageSelect = ({
  question,
  index,
}: QuestionBlockCardSharedProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 16 }}>
      <Image
        src="https://picsum.photos/200"
        alt="first image"
        width={200}
        height={200}
      />
      <Image
        src="https://picsum.photos/200"
        alt="second image"
        width={200}
        height={200}
      />
    </Box>
  );
};

export default QuestionBlockImageSelect;
