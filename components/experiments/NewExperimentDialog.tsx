import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import useCreateNewExperimentForm from "../../hooks/experiments/useCreateNewExperimentForm";
import Dialog from "../MuiOverrides/Dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const NewExperimentDialog = ({ open, onClose, onSave }: Props) => {
  const [register, onSubmit, errors] = useCreateNewExperimentForm();

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="sm">
      <form onSubmit={onSubmit(onSave)}>
        <DialogTitle>Create New Experiment</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Stack spacing={1}>
              <TextField
                {...register("title", {
                  required: "Experiment title is required.",
                })}
                label="Experiment Name"
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
              />
              <TextField
                {...register("description", {
                  required: "Experiment description is required.",
                })}
                label="Experiment description (invisible for participants)"
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
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
          <Button type="submit" variant="contained">
            Create experiment
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewExperimentDialog;
