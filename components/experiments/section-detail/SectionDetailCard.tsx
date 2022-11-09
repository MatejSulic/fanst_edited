import CloseIcon from "@mui/icons-material/Close";
import {
  Card,
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

  useEffect(() => {
    setloadedInBrowser(true);
  }, []);

  return loadedInBrowser ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card
        variant="outlined"
        sx={{
          // width: (theme) => theme.breakpoints.values["sm"],
          // maxWidth: (theme) => theme.breakpoints.values["sm"],
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
                          key={item.id}
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
      </Card>
    </DragDropContext>
  ) : null;
};

SectionDetailList.getInitialProps = async (context) => {
  resetServerContext();
  return {};
};

export default SectionDetailList;
