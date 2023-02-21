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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextTruncate from "react-text-truncate";
import { useLockExperimentContext } from "../../contexts/experiments/lockExperimentContext";
import {
  useCopyExperimentMutation,
  useUpdateExperimentMutation,
} from "../../hooks/experiments/useExperiments";
import { ExperimentType } from "../../types/experiment";
import InviteParticipantDialog from "./invite-participant/InviteParticipantDialog";

type Props = {
  experiment: ExperimentType;
};

const ExperimentListItem = ({ experiment }: Props) => {
  const router = useRouter();
  const [openNestedListItem, setOpenNestedListItem] = useState(false);
  const [inviteParticipantDialogDetails, setInviteParticipantDialogDetails] =
    useState<{ open: boolean; experimentId: string | null }>({
      open: false,
      experimentId: null,
    });

  const lockExperimentContext = useLockExperimentContext();
  const copyExperimentMutation = useCopyExperimentMutation(
    experiment._id.toString()
  );
  const updateExperimentMutation = useUpdateExperimentMutation(
    experiment._id.toString()
  );

  const handleCopyExperiment = async () => {
    copyExperimentMutation.mutate();
  };

  const handleInviteParticipantOpen = (experimentId: string) => {
    setInviteParticipantDialogDetails({ open: true, experimentId });
  };

  const handleArchiveExperiment = () => {
    updateExperimentMutation.mutate({ experimentData: { archived: true } });
  };

  useEffect(() => {
    // redirect to newly copied experiment
    if (copyExperimentMutation.isSuccess && copyExperimentMutation.data) {
      router.push(`/experiments/${copyExperimentMutation.data._id.toString()}`);
    }
  }, [router, copyExperimentMutation.data, copyExperimentMutation.isSuccess]);

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
                  onClick={() =>
                    handleInviteParticipantOpen(experiment._id.toString())
                  }
                >
                  Invite participant
                </Button>
              )}
              {experiment.locked && (
                <Button size="small" onClick={() => handleCopyExperiment()}>
                  Copy experiment
                </Button>
              )}
              <Button
                size="small"
                color="warning"
                onClick={() => handleArchiveExperiment()}
              >
                Archive
              </Button>
              <Button size="small" color="error">
                Delete
              </Button>
            </Box>
          </ListItem>
        </List>
      </Collapse>

      <InviteParticipantDialog
        experimentId={inviteParticipantDialogDetails.experimentId!}
        open={inviteParticipantDialogDetails.open}
        onClose={() =>
          setInviteParticipantDialogDetails({ open: false, experimentId: null })
        }
        onSave={() =>
          setInviteParticipantDialogDetails({ open: false, experimentId: null })
        }
      />
    </>
  );
};

export default ExperimentListItem;
