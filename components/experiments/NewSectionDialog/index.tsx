import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import Dialog from "../../MuiOverrides/Dialog";
import SectionType2AFC from "./SectionType2AFC";
import SectionTypeAcknowledgement from "./SectionTypeAcknowledgement";
import SectionTypeIntroduction from "./SectionTypeIntroduction";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const NewSectionDialog = ({ open, onClose, onSave }: Props) => {
  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="sm">
      <DialogTitle>New Section</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the type of section you would like to add:
        </DialogContentText>
        <Box sx={{ mt: 1 }}>
          <Stack spacing={1}>
            <SectionTypeIntroduction />
            <SectionType2AFC />
            <SectionTypeAcknowledgement />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose()}
          sx={{ color: (theme) => theme.palette.warning.main }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={() => onSave()}>
          Add section
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewSectionDialog;
