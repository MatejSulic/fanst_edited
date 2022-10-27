import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Dialog from "../MuiOverrides/Dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const ExperimentSettingsDialog = ({ open, onClose, onSave }: Props) => {
  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="sm">
      <DialogTitle>Experiment Settings</DialogTitle>
      <DialogContent className="space-y-8">
        <DialogContentText>
          This settings apply to the whole experiment.
        </DialogContentText>
        <form className="space-y-4">
          <TextField
            label="Počet skupin participantů"
            type="number"
            inputProps={{ min: 1 }}
            fullWidth
          />
          <Box className="flex gap-4 items-baseline">
            <TextField
              label="Maximální časová platnost experimentu"
              type="number"
              inputProps={{ min: 1 }}
              fullWidth
            />
            <Typography component="span" variant="body2">
              minut
            </Typography>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExperimentSettingsDialog;
