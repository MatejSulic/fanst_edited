import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useState } from "react";
import TextTruncate from "react-text-truncate";
import { useLockExperimentContext } from "../../contexts/experiments/lockExperimentContext";
import { ExperimentType } from "../../types/experiment";
import InviteParticipantDialog from "./invite-participant/InviteParticipantDialog";

type Props = {
  experiment: ExperimentType;
};

const ExperimentListItem = ({ experiment }: Props) => {
  const [openNestedListItem, setOpenNestedListItem] = useState(false);
  const [inviteParticipantDialogOpen, setInviteParticipantDialogOpen] =
    useState(false);

  const lockExperimentContext = useLockExperimentContext();

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => setOpenNestedListItem((prev) => !prev)}
          sx={{
            backgroundColor: openNestedListItem
              ? (theme) => theme.palette.action.selected
              : undefined,
          }}
        >
          <ListItemText
            disableTypography
            primary={
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>{experiment.title}</span>
                {experiment.locked && (
                  <Typography
                    variant="subtitle2"
                    color={(theme) => theme.palette.error.main}
                  >
                    Experiment is already locked
                  </Typography>
                )}
              </Box>
            }
            secondary={
              <TextTruncate
                textElement="span"
                containerClassName="text-gray-500 text-sm pt-2"
                line={2}
                text={experiment.description}
              />
            }
          />
        </ListItemButton>
      </ListItem>

      <Collapse in={openNestedListItem} timeout="auto">
        <List
          component="div"
          disablePadding
          sx={{
            backgroundColor: (theme) => theme.palette.action.selected,
          }}
        >
          <ListItem>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: 4,
              }}
            >
              <Button
                size="small"
                component={Link}
                href={`/experiments/${experiment._id.toString()}`}
              >
                Edit
              </Button>
              <Button size="small">Preview</Button>
              <Button size="small">View Results</Button>
              {!experiment.locked && (
                <Button
                  size="small"
                  color="warning"
                  onClick={() => lockExperimentContext.lockExperiment()}
                >
                  Lock experiment
                </Button>
              )}
              {experiment.locked && (
                <Button
                  size="small"
                  onClick={() => setInviteParticipantDialogOpen(true)}
                >
                  Invite participant
                </Button>
              )}
              <Button size="small" color="error">
                Delete
              </Button>
            </Box>
          </ListItem>
        </List>
      </Collapse>

      <InviteParticipantDialog
        experimentId={experiment._id.toString()}
        open={inviteParticipantDialogOpen}
        onClose={() => setInviteParticipantDialogOpen(false)}
        onSave={() => setInviteParticipantDialogOpen(false)}
      />
    </>
  );
};

export default ExperimentListItem;
