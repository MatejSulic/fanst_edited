import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ExperimentSettingsDialog from "./ExperimentSettingsDialog";

type Props = {
  children: React.ReactNode;
};

const PageToolbar = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box className="w-full px-8 flex justify-between gap-8">
        {children}
        <Box className="flex justify start items-center gap-4">
          <Button variant="outlined" size="small" onClick={handleOpen}>
            Experiment settings
          </Button>
          <Button variant="text" size="small">
            Preview experiment
          </Button>
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
