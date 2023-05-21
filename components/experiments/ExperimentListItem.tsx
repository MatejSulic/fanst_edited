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
  useDeleteExperimentMutation,
  useUpdateExperimentMutation,
} from "../../hooks/experiments/useExperiments";
import { ExperimentType } from "../../types/experiment";
import ExperimentParticipantsDialog from "./experiment-participants/ExperimentParticipantsDialog";

type Props = {
  experiment: ExperimentType;
};

const ExperimentListItem = ({ experiment }: Props) => {
  const router = useRouter();
  const [openNestedListItem, setOpenNestedListItem] = useState(false);
  const [participantsDialogExperimentId, setParticipantsDialogExperimentId] =
    useState<string | undefined>(undefined);

  const lockExperimentContext = useLockExperimentContext();
  const copyExperimentMutation = useCopyExperimentMutation(
    experiment._id.toString()
  );
  const updateExperimentMutation = useUpdateExperimentMutation(
    experiment._id.toString()
  );
  const deleteExperimentMutation = useDeleteExperimentMutation(
    experiment._id.toString()
  );

  const handleCopyExperiment = async () => {
    copyExperimentMutation.mutate();
  };

  const handleArchiveExperiment = () => {
    updateExperimentMutation.mutate({ experimentData: { archived: true } });
  };

  const handleRemoveFromArchiveExperiment = () => {
    updateExperimentMutation.mutate({ experimentData: { archived: false } });
  };

  const handleDeleteExperiment = () => {
    deleteExperimentMutation.mutate();
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
                {experiment.locked ? "View" : "Edit"}
              </Button>
              <Button size="small">Preview</Button>
              {experiment.locked && (
                <Button
                  size="small"
                  onClick={() => {
                    setParticipantsDialogExperimentId(
                      experiment._id.toString()
                    );
                  }}
                >
                  Manage Participants
                </Button>
              )}
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
                <Button size="small">
                  <Link
                    href={{
                      pathname: "/results",
                      query: { experimentId: experiment._id.toString() },
                    }}
                  >
                    View Results
                  </Link>
                </Button>
              )}
              {experiment.locked && (
                <Button size="small" onClick={() => handleCopyExperiment()}>
                  Copy experiment
                </Button>
              )}
              {experiment.locked && !experiment.archived && (
                <Button
                  size="small"
                  color="warning"
                  onClick={() => handleArchiveExperiment()}
                >
                  Archive
                </Button>
              )}
              {experiment.locked && experiment.archived && (
                <Button
                  size="small"
                  color="warning"
                  onClick={() => handleRemoveFromArchiveExperiment()}
                >
                  Remove from archive
                </Button>
              )}
              {!experiment.locked && (
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteExperiment()}
                >
                  Delete
                </Button>
              )}
            </Box>
          </ListItem>
        </List>
      </Collapse>

      {participantsDialogExperimentId && (
        <ExperimentParticipantsDialog
          key={participantsDialogExperimentId}
          experimentId={participantsDialogExperimentId}
          open={!!participantsDialogExperimentId}
          onClose={() => setParticipantsDialogExperimentId(undefined)}
          onSave={() => {}}
        />
      )}
    </>
  );
};

export default ExperimentListItem;
