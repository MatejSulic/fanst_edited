import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useLockExperimentContext } from "../../contexts/experiments/lockExperimentContext";
import ExperimentParticipantsDialog from "../experiments/experiment-participants/ExperimentParticipantsDialog";
import ExperimentSettingsDialog from "./ExperimentSettingsDialog";

type Props = {
  children: React.ReactNode;
};

const PageToolbar = ({ children }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inviteParticipantDialogOpen, setInviteParticipantDialogOpen] =
    useState(false);
  const lockExperimentContext = useLockExperimentContext();

  const { experimentId } = router.query;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{ boxSizing: "border-box", width: "100%", px: { md: 2 }, py: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: children ? "space-between" : "flex-end",
            alignItems: "center",
            gap: { xs: 4, md: 2 },
            overflowX: "auto",
          }}
        >
          {children}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 4, md: 2 },
            }}
          >
            {lockExperimentContext.isExperimentLocked ? null : (
              <Button variant="outlined" size="small" onClick={handleOpen}>
                Experiment settings
              </Button>
            )}
            {lockExperimentContext.isExperimentLocked ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => setInviteParticipantDialogOpen(true)}
              >
                Manage participants
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

      <ExperimentParticipantsDialog
        experimentId={experimentId as string}
        open={inviteParticipantDialogOpen}
        onClose={() => setInviteParticipantDialogOpen(false)}
        onSave={() => {}}
      />
    </>
  );
};

export default PageToolbar;
