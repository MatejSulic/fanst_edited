import { List, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { SectionType } from "../../../types/section/section";
import SectionListItem from "./SectionListItem";

type Props = {
  sections: SectionType[];
};

const SectionList = ({ sections }: Props) => {
  const router = useRouter();
  const { experimentId, sectionId } = router.query;

  return (
    <Stack
      spacing={2}
      direction={{ xs: "row", md: "column" }}
      sx={{
        maxHeight: { md: "100%" },
        overflowX: { xs: "auto", md: "hidden" },
        overflowY: { xs: "hidden", md: "auto" },
        width: { xs: "100%", md: 260 },
        maxWidth: { xs: "100%", md: 260 },
        display: { xs: "flex", md: "block" },
        boxSizing: "border-box",
        p: 1,
        m: -1,
      }}
    >
      {/* <List sx={{ width: "100%", maxWidth: 320, py: 0 }}> */}
      {sections.map((item, idx) => (
        <Box key={item._id.toString()} sx={{ flexShrink: 1 }}>
          <SectionListItem
            key={item._id.toString()}
            idx={idx + 1}
            section={item}
            activeExperimentId={experimentId as string}
            activeSectionId={sectionId as string | undefined}
          />
        </Box>
      ))}
      {/* </List> */}
    </Stack>
  );
};

export default SectionList;
