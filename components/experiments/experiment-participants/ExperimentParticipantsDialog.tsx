import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGenerateAnonymousParticipantsMutation } from "../../../hooks/experiments/useGenerateAnonymousParticipants";
import useInviteParticipantForm from "../../../hooks/experiments/useInviteParticipantForm";
import {
  useDeleteParticipantMutation,
  useParticipants,
} from "../../../hooks/participants/useParticipants";
import {
  getParticipantMailtoBodyUriEncoded,
  getParticipantMailtoSubjectUriEncoded,
} from "../../../utils/participantInviteEmail";

type Props = {
  experimentId?: string;
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
};

const StyledListItemSecondaryAction = styled(ListItemSecondaryAction)`
  visibility: hidden;
`;

const StyledListItem = styled(ListItem)`
  :hover .MuiListItemSecondaryAction-root {
    visibility: inherit;
  }
`;

const ExperimentParticipantsDialog = ({
  experimentId,
  open,
  onClose,
  onSave,
}: Props) => {
  const [addingNewParticipant, setAddingNewParticipant] = useState(false);
  const [generatingAnonymous, setGeneratingAnonymous] = useState(false);
  const [anonymousCount, setAnonymousCount] = useState(1);
  const [generatedLinks, setGeneratedLinks] = useState<string[]>([]);

  const { data, isLoading, isError } = useParticipants({ experimentId });
  const deleteParticipantMutation = useDeleteParticipantMutation();
  const generateMutation = useGenerateAnonymousParticipantsMutation(
    experimentId as string
  );
  const { register, onSubmit, setValue, reset, errors } =
    useInviteParticipantForm();

  useEffect(() => {
    if (experimentId) setValue("experimentId", experimentId);
  }, [experimentId, setValue]);

  const handleReset = () => {
    setAddingNewParticipant(false);
    setGeneratingAnonymous(false);
    setGeneratedLinks([]);
    reset();
    if (experimentId) setValue("experimentId", experimentId);
  };

  const handleClose = () => {
    handleReset();
    return onClose();
  };

  const handleSave = () => {
    handleReset();
    if (onSave) return onSave();
  };

  const handleDeleteParticipant = (participantId: string) => {
    if (experimentId)
      deleteParticipantMutation.mutate({ experimentId, participantId });
  };

  const handleGenerateAnonymous = () => {
    generateMutation.mutate(anonymousCount, {
      onSuccess: (ids: string[]) => {
        const origin =
          typeof window !== "undefined" ? window.location.origin : "";
        setGeneratedLinks(
          ids.map(
            (id) =>
              `${origin}/public/experiment-preview/${experimentId}/${id}`
          )
        );
      },
    });
  };

  const getMailtoString = (participantId: string, participantEmail: string) =>
    `mailto:${participantEmail}?subject=${getParticipantMailtoSubjectUriEncoded()}&body=${getParticipantMailtoBodyUriEncoded(
      experimentId as string,
      participantId
    )}`;

  if (!experimentId) return null;

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      fullWidth
      maxWidth="sm"
      sx={{ height: (theme) => theme.breakpoints.values.sm }}
    >
      {isLoading || isError ? (
        <CircularProgress />
      ) : (
        <>
          <DialogTitle>Experiment Participants</DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              {data.length > 0 ? (
                <List>
                  {data.map((participant, idx) => (
                    <StyledListItem
                      key={participant._id.toString()}
                      sx={{ p: 0 }}
                    >
                      {!participant.anonymous && (
                        <ListItemIcon>
                          <IconButton
                            href={getMailtoString(
                              participant._id.toString(),
                              participant.email
                            )}
                          >
                            <ForwardToInboxIcon />
                          </IconButton>
                        </ListItemIcon>
                      )}
                      <ListItemButton
                        LinkComponent={Link}
                        href={`/public/experiment-preview/${experimentId}/${participant._id.toString()}`}
                        sx={participant.anonymous ? { pl: participant.anonymous ? 7 : 0 } : {}}
                      >
                        <ListItemText
                          primary={
                            participant.anonymous
                              ? `Anonymous #${idx + 1}`
                              : participant.email
                          }
                        />
                        <StyledListItemSecondaryAction>
                          <IconButton
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteParticipant(
                                participant._id.toString()
                              );
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </StyledListItemSecondaryAction>
                      </ListItemButton>
                    </StyledListItem>
                  ))}
                </List>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography>No participants</Typography>
                </Box>
              )}

              {generatedLinks.length > 0 && (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="subtitle2">
                      Generated links — copy and share:
                    </Typography>
                    <Tooltip title="Download as CSV">
                      <IconButton
                        size="small"
                        onClick={() => {
                          const csv = "link\n" + generatedLinks.join("\n");
                          const blob = new Blob([csv], { type: "text/csv" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "participant-links.csv";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Stack spacing={1}>
                    {generatedLinks.map((link, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          backgroundColor: "grey.100",
                          borderRadius: 1,
                          px: 1.5,
                          py: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            flex: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {link}
                        </Typography>
                        <Tooltip title="Copy link">
                          <IconButton
                            size="small"
                            onClick={() => navigator.clipboard.writeText(link)}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "100%",
                  width: "100%",
                }}
              >
                {addingNewParticipant ? (
                  <form
                    onSubmit={onSubmit(handleSave)}
                    style={{ width: "100%" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <TextField
                        {...register("email", {
                          required: "Participant email is required.",
                        })}
                        type="email"
                        label="New participant email"
                        fullWidth
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                      />
                      <Button type="submit" variant="contained">
                        Add
                      </Button>
                    </Box>
                  </form>
                ) : generatingAnonymous ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <TextField
                      type="number"
                      label="Number of links"
                      value={anonymousCount}
                      onChange={(e) =>
                        setAnonymousCount(
                          Math.min(50, Math.max(1, Number(e.target.value)))
                        )
                      }
                      inputProps={{ min: 1, max: 50 }}
                      sx={{ width: 160 }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleGenerateAnonymous}
                      disabled={generateMutation.isLoading}
                    >
                      Generate
                    </Button>
                    <Button onClick={() => setGeneratingAnonymous(false)}>
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => setAddingNewParticipant(true)}
                      startIcon={<PersonAddIcon />}
                    >
                      Invite new participant
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setGeneratedLinks([]);
                        setGeneratingAnonymous(true);
                      }}
                    >
                      Generate anonymous links
                    </Button>
                  </Box>
                )}
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleClose()}
              sx={{ color: (theme) => theme.palette.warning.main }}
            >
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ExperimentParticipantsDialog;
