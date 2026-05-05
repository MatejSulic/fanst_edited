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
        subheader={<ListSubheader>Categories</ListSubheader>}
        sx={{
          width: "100%",
          maxWidth: (theme) => theme.breakpoints.values.sm,
          backgroundColor: "white",
        }}
      >
        <ListItemButton
          selected={
            router.query.category === undefined ||
            router.query.category === "active"
          }
          onClick={() => {
            router.push({ query: { category: "active" } }, undefined, {
              shallow: true,
            });
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
            router.push({ query: { category: "archive" } }, undefined, {
              shallow: true,
            });
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
