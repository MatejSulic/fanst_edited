import { Box, List, ListItem, ListSubheader, TextField } from "@mui/material";

type Props = {
  sectionId: string;
};

const SectionSettingsCard = ({ sectionId }: Props) => {
  return (
    <Box className="max-h-full overflow-y-auto w-64">
      <List
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nastavení sekce {sectionId}
          </ListSubheader>
        }
        className="w-full max-w-xs bg-white"
      >
        <ListItem className="flex items-start gap-4">
          <TextField label="Čas zobrazení otázky" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SectionSettingsCard;
