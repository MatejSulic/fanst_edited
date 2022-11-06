import { List } from "@mui/material";
import { Box } from "@mui/system";
import { SectionType } from "../../../types/section";
import SectionListItem from "./SectionListItem";

type Props = {
  sections: SectionType[];
};

const SectionList = ({ sections }: Props) => {
  return (
    <Box className="max-h-full overflow-y-auto w-64">
      <List
        aria-labelledby="nested-list-subheader"
        className="w-full max-w-xs bg-white py-0"
      >
        {sections.map((item, idx) => (
          <SectionListItem key={item.id} idx={idx + 1} section={item} />
        ))}
      </List>
    </Box>
  );
};

export default SectionList;
