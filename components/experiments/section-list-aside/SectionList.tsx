import { List } from "@mui/material";
import { Box } from "@mui/system";
import { SectionType } from "../../../types/section/section";
import SectionListItem from "./SectionListItem";

type Props = {
  sections: SectionType[];
};

const SectionList = ({ sections }: Props) => {
  return (
    <Box sx={{ maxHeight: "100%", overflowY: "auto", width: 256 }}>
      <List sx={{ width: "100%", maxWidth: 320, py: 0 }}>
        {sections.map((item, idx) => (
          <SectionListItem
            key={item._id.toString()}
            idx={idx + 1}
            section={item}
          />
        ))}
      </List>
    </Box>
  );
};

export default SectionList;
