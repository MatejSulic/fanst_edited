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
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useExperiments } from "../../hooks/experiments/useExperiments";
import useUpdateExperimentForm from "../../hooks/experiments/useUpdateExperimentForm";
import { ExperimentType } from "../../types/experiment";
import Dialog from "../MuiOverrides/Dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const ExperimentSettingsDialog = ({ open, onClose, onSave }: Props) => {
  const router = useRouter();
  const { experimentId } = router.query;

  const { register, onSubmit, reset } = useUpdateExperimentForm(
    experimentId as string
  );

  const {
    data: experiments,
    isLoading: experimentsIsLoading,
    isError: experimentsIsError,
  } = useExperiments();
  let currentExperiment;
  if (experiments) {
    currentExperiment = (experiments as ExperimentType[]).find(
      (item) => item._id.toString() === experimentId
    )!;
  }

  useEffect(() => {
    if (open) reset();
  }, [open]);

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="sm">
      <form onSubmit={onSubmit(onSave)}>
        <DialogTitle>Experiment Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This settings apply to the whole experiment.
          </DialogContentText>
          <Box sx={{ mt: 1 }}>
            <Stack spacing={1}>
              <TextField
                label="Experiment name"
                fullWidth
                defaultValue={currentExperiment?.title}
                {...register("title")}
              />
              <TextField
                label="Experiment description"
                fullWidth
                multiline
                rows={4}
                defaultValue={currentExperiment?.description}
                {...register("description")}
              />
              <TextField
                label="Number of participant groups"
                type="number"
                inputProps={{ min: 1 }}
                fullWidth
                defaultValue={
                  currentExperiment?.settings?.numberOfParticipantGroups
                }
                {...register("settings.numberOfParticipantGroups")}
              />
              {/* <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
                <TextField
                  label="Maximum time validity"
                  type="number"
                  inputProps={{ min: 1 }}
                  fullWidth
                  defaultValue={
                    currentExperiment?.settings?.maximumTimeValidity
                  }
                  {...register("settings.maximumTimeValidity")}
                />
                <Typography component="span" variant="body2">
                  minutes
                </Typography>
              </Box> */}
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
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExperimentSettingsDialog;
