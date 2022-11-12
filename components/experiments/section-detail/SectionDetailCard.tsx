import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
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

  const [loadedInBrowser, setloadedInBrowser] = useState(false);
  const [newQuestionDialogOpen, setNewQuestionDialogOpen] = useState(false);

  useEffect(() => {
    setloadedInBrowser(true);
  }, []);

  return loadedInBrowser ? (
    <>
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
            title={<Typography variant="h6">{section.title}</Typography>}
            className="pb-0"
          />
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="body2">{section.description}</Typography>
              <Droppable droppableId="section-detail-list-droppable">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <List sx={{ p: 0, m: 0 }}>
                      <Stack spacing={1}>
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
              variant="contained"
              onClick={() => setNewQuestionDialogOpen(true)}
            >
              Add New Question
            </Button>
          </CardActions>
        </Card>
      </DragDropContext>
      <NewQuestionDialog
        open={newQuestionDialogOpen}
        onClose={() => setNewQuestionDialogOpen(false)}
        onSave={() => setNewQuestionDialogOpen(false)}
      />
    </>
  ) : null;
};

SectionDetailList.getInitialProps = async (context) => {
  resetServerContext();
  return {};
};

export default SectionDetailList;
