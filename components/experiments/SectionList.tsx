import { List } from "@mui/material";
import { Box } from "@mui/system";
import SectionListItem from "./SectionListItem";

const SectionList = () => {
  return (
    <Box className="max-h-full overflow-y-auto w-64">
      <List
        aria-labelledby="nested-list-subheader"
        className="w-full max-w-xs bg-white py-0"
      >
        <SectionListItem />
        <SectionListItem />
        <SectionListItem />
        <SectionListItem />
      </List>
    </Box>
  );
};

export default SectionList;
