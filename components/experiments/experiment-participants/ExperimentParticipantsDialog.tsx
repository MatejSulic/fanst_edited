import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
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
  Typography,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useInviteParticipantForm from "../../../hooks/experiments/useInviteParticipantForm";
import {
  useDeleteParticipantMutation,
  useParticipants,
} from "../../../hooks/participants/useParticipants";
import Link from "next/link";

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
  const router = useRouter();
  const [addingNewParticipant, setAddingNewParticipant] = useState(false);
  const { data, isLoading, isError } = useParticipants({ experimentId });
  const deleteParticipantMutation = useDeleteParticipantMutation();
  const { register, onSubmit, setValue, reset, errors } =
    useInviteParticipantForm();

  useEffect(() => {
    if (experimentId) setValue("experimentId", experimentId);
  }, [experimentId, setValue]);

  const handleReset = () => {
    setAddingNewParticipant(false);
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
                  {data.map((participant) => (
                    <StyledListItem
                      key={participant._id.toString()}
                      // secondaryAction={
                      //   <IconButton
                      //     onClick={() =>
                      //       handleDeleteParticipant(participant._id.toString())
                      //     }
                      //   >
                      //     <DeleteIcon />
                      //   </IconButton>
                      // }
                    >
                      {/* <Link
                        href={`/public/experiment-preview/${experimentId}/${participant._id.toString()}`}
                      > */}
                      <ListItemButton
                        LinkComponent={Link}
                        href={`/public/experiment-preview/${experimentId}/${participant._id.toString()}`}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={participant.email} />
                        <StyledListItemSecondaryAction>
                          <IconButton
                            onClick={() =>
                              handleDeleteParticipant(
                                participant._id.toString()
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </StyledListItemSecondaryAction>
                      </ListItemButton>
                      {/* </Link> */}
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
                ) : (
                  <Box>
                    <Button
                      variant="contained"
                      onClick={() => setAddingNewParticipant(true)}
                      startIcon={<PersonAddIcon />}
                    >
                      Invite new participant
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
