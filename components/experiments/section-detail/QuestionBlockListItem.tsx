import { ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Draggable, resetServerContext } from "react-beautiful-dnd";
import { QuestionType } from "../../../types/question/question";
import QuestionBlockCard from "./QuestionBlockCard";

type Props = {
  question: QuestionType;
  index: number;
};

const QuestionBlockListItem = ({ question, index }: Props) => {
  const [loadedInBrowser, setloadedInBrowser] = useState(false);

  useEffect(() => {
    setloadedInBrowser(true);
  }, []);

  return loadedInBrowser ? (
    <Draggable
      key={question._id.toString()}
      draggableId={`section-detail-list-draggable-${question._id.toString()}`}
      index={index}
    >
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          className={snapshot.isDragging ? "bg-gray-50" : ""}
          sx={{ display: "list-item", padding: 0 }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <QuestionBlockCard question={question} index={index} />
        </ListItem>
      )}
    </Draggable>
  ) : null;
};

QuestionBlockListItem.getInitialProps = async (context) => {
  resetServerContext();
  return {};
};

export default QuestionBlockListItem;
