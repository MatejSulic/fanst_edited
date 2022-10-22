import { CardContent, List, ListSubheader } from "@mui/material";
import { Box } from "@mui/system";
import SectionListItem from "./SectionListItem";

const SectionList = () => {
  return (
    <Box className="max-h-full overflow-y-auto w-64">
      <List
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Sekce experimentu
          </ListSubheader>
        }
        className="w-full max-w-xs bg-white"
      >
        <SectionListItem />
        <SectionListItem />
        <SectionListItem />
        <SectionListItem />
        <SectionListItem />
        <SectionListItem />
        <SectionListItem />
        <SectionListItem />
        <SectionListItem />
      </List>
    </Box>
  );
};

export default SectionList;
