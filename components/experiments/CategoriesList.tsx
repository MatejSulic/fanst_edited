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
import { useRouter } from "next/router";

const CategoriesList = () => {
  const router = useRouter();

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
        <ListItemButton
          selected={
            router.query.category === undefined ||
            router.query.category === "active"
          }
          onClick={() => {
            router.push({ query: { category: "active" } });
          }}
        >
          <ListItemIcon>
            <WhatshotIcon />
          </ListItemIcon>
          <ListItemText primary="Active" />
        </ListItemButton>
        <ListItemButton
          selected={router.query.category === "archive"}
          onClick={() => {
            router.push({ query: { category: "archive" } });
          }}
        >
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
