import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  NoSsr,
  TextField,
  Tooltip,
} from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import { UpdateSectionFormContextProvider } from "../../../contexts/experiments/experiment-detail/sectionDetailContext";
import useUpdateSectionForm from "../../../hooks/experiments/experiment-detail/useUpdateSectionForm";
import { QuestionType } from "../../../types/question/question";
import { SectionType } from "../../../types/section/section";
import NewQuestionDialog from "./NewQuestionDialog";
import QuestionBlockListItem from "./QuestionBlockListItem";

type Props = {
  section: SectionType;
  questions: QuestionType[];
  onDragEnd: (res: DropResult) => void;
};

const SectionDetailList = ({ section, questions, onDragEnd }: Props) => {
  const router = useRouter();
  const { experimentId, sectionId } = router.query;
  const [newQuestionDialogOpen, setNewQuestionDialogOpen] = useState(false);

  const [register, setValue, onSubmit, errors] = useUpdateSectionForm(
    experimentId as string,
    sectionId as string
  );

  return (
    <NoSsr>
      <UpdateSectionFormContextProvider
        value={{ register, setValue, onSubmit, errors }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Card
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              overflowY: "auto",
            }}
          >
            <form onSubmit={onSubmit()}>
              <CardHeader
                action={
                  <Tooltip title="Close section detail">
                    <IconButton
                      component={Link}
                      href={`/experiments/${experimentId}`}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                }
                title={
                  <TextField
                    label="Section title"
                    defaultValue={section.title}
                    {...register("title")}
                  />
                }
                className="pb-0"
              />
              <CardContent>
                <Stack spacing={4}>
                  <TextField
                    label="Section description"
                    multiline
                    minRows={4}
                    defaultValue={section.description}
                    size="small"
                    {...register("description")}
                  />
                  <Droppable droppableId="section-detail-list-droppable">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <List sx={{ p: 0, m: 0 }}>
                          <Stack spacing={2}>
                            {questions.map((item, idx) => (
                              <QuestionBlockListItem
                                key={item._id.toString()}
                                question={item}
                                index={idx}
                              />
                            ))}
                          </Stack>
                        </List>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Stack>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setNewQuestionDialogOpen(true)}
                >
                  Add New Question
                </Button>
                <Button type="submit" variant="contained">
                  Save section
                </Button>
              </CardActions>
            </form>
          </Card>
        </DragDropContext>
      </UpdateSectionFormContextProvider>
      <NewQuestionDialog
        open={newQuestionDialogOpen}
        onClose={() => setNewQuestionDialogOpen(false)}
        onSave={() => setNewQuestionDialogOpen(false)}
      />
    </NoSsr>
  );
};

SectionDetailList.getInitialProps = async (context) => {
  resetServerContext();
  return {};
};

export default SectionDetailList;
