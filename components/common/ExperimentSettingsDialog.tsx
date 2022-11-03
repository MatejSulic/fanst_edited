import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
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
      <DialogContent>
        <DialogContentText>
          This settings apply to the whole experiment.
        </DialogContentText>
        <Box sx={{ mt: 1 }}>
          <form>
            <Stack spacing={1}>
              <TextField
                label="Počet skupin participantů"
                type="number"
                inputProps={{ min: 1 }}
                fullWidth
              />
              <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
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
            </Stack>
          </form>
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExperimentSettingsDialog;
