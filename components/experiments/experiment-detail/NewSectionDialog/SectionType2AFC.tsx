import { Box } from "@mui/system";
import Image from "next/image";
import SectionTypeCard, { SectionTypeCardSharedProps } from "./SectionTypeCard";

const SectionType2AFC = ({ ...props }: SectionTypeCardSharedProps) => {
  return (
    <SectionTypeCard
      title="2-AFC"
      subheader="Upload multiple images at once. The system generates 2-AFC using the uploaded images."
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
    </SectionTypeCard>
  );
};

export default SectionType2AFC;
