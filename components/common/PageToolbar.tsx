import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useLockExperimentContext } from "../../contexts/experiments/lockExperimentContext";
import ExperimentSettingsDialog from "./ExperimentSettingsDialog";

type Props = {
  children: React.ReactNode;
};

const PageToolbar = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const lockExperimentContext = useLockExperimentContext();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box className="w-full px-8 flex justify-between gap-8">
        {children}
        <Box className="flex justify start items-center gap-4">
          {lockExperimentContext.isExperimentLocked ? null : (
            <Button variant="outlined" size="small" onClick={handleOpen}>
              Experiment settings
            </Button>
          )}
          <Button variant="text" size="small">
            Preview experiment
          </Button>
          {lockExperimentContext.isExperimentLocked ? null : (
            <Button
              variant="outlined"
              size="small"
              color="warning"
              onClick={() => lockExperimentContext.lockExperiment()}
            >
              Lock experiment
            </Button>
          )}
        </Box>
      </Box>

      <ExperimentSettingsDialog
        open={open}
        onClose={handleClose}
        onSave={handleClose}
      />
    </>
  );
};

export default PageToolbar;
