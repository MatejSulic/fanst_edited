import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import useInviteParticipantForm from "../../../hooks/experiments/useInviteParticipantForm";

type Props = {
  experimentId: string;
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
};

const InviteParticipantDialog = ({
  experimentId,
  open,
  onClose,
  onSave,
}: Props) => {
  const [register, onSubmit, reset, errors] =
    useInviteParticipantForm(experimentId);

  const handleClose = () => {
    reset();
    return onClose();
  };

  const handleSave = () => {
    reset();
    if (onSave) return onSave();
  };

  // TODO: invite multiple participants at once
  // one text field + "add another participant" button that creates new text field -> send emails as array of strings
  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth="sm">
      <form onSubmit={onSubmit(handleSave)}>
        <DialogTitle>Invite Participant</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Stack spacing={1}>
              <TextField
                {...register("email", {
                  required: "Participant email is required.",
                })}
                type="email"
                label="Participant email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            sx={{ color: (theme) => theme.palette.warning.main }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Invite participant
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InviteParticipantDialog;
