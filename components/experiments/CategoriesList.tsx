import ArchiveIcon from "@mui/icons-material/Archive";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

const CategoriesList = () => {
  return (
    <Box>
      <List
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Categories
          </ListSubheader>
        }
        className="w-full h-full max-w-sm bg-white"
      >
        <ListItemButton selected>
          <ListItemIcon>
            <WhatshotIcon />
          </ListItemIcon>
          <ListItemText primary="Active" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default CategoriesList;
