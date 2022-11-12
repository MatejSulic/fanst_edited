import { List } from "@mui/material";
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
    <Box sx={{ maxHeight: "100%", overflowY: "auto", width: 256 }}>
      <List sx={{ width: "100%", maxWidth: 320, py: 0 }}>
        {sections.map((item, idx) => (
          <SectionListItem
            key={item._id.toString()}
            idx={idx + 1}
            section={item}
            activeExperimentId={experimentId as string}
            activeSectionId={sectionId as string | undefined}
          />
        ))}
      </List>
    </Box>
  );
};

export default SectionList;
