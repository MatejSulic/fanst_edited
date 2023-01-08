import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useLockExperimentContext } from "../../contexts/experiments/lockExperimentContext";
import InviteParticipantDialog from "../experiments/invite-participant/InviteParticipantDialog";
import ExperimentSettingsDialog from "./ExperimentSettingsDialog";

type Props = {
  children: React.ReactNode;
};

const PageToolbar = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [inviteParticipantDialogOpen, setInviteParticipantDialogOpen] =
    useState(false);
  const lockExperimentContext = useLockExperimentContext();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            px: 2,
            display: "flex",
            justifyContent: children ? "space-between" : "flex-end",
            gap: 4,
          }}
        >
          {children}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {lockExperimentContext.isExperimentLocked ? null : (
              <Button variant="outlined" size="small" onClick={handleOpen}>
                Experiment settings
              </Button>
            )}
            {lockExperimentContext.isExperimentLocked ? (
              <Button variant="contained" size="small" onClick={handleOpen}>
                Invite participants
              </Button>
            ) : null}
            <Button variant="text" size="small">
              Preview experiment
            </Button>
            {lockExperimentContext.isExperimentLocked ? null : (
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={() => lockExperimentContext.lockExperiment()}
              >
                Lock experiment
              </Button>
            )}
          </Box>
        </Box>
        {lockExperimentContext.isExperimentLocked && (
          <Box
            sx={{
              display: "flex",
              m: 0,
              mt: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              lineHeight: "normal",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color={(theme) => theme.palette.warning.dark}
            >
              Experiment is locked
            </Typography>
          </Box>
        )}
      </Box>

      <ExperimentSettingsDialog
        open={open}
        onClose={handleClose}
        onSave={handleClose}
      />

      <InviteParticipantDialog
        open={inviteParticipantDialogOpen}
        onClose={() => setInviteParticipantDialogOpen(false)}
        onSave={() => setInviteParticipantDialogOpen(false)}
      />
    </>
  );
};

export default PageToolbar;
