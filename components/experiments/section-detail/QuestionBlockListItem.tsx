import { ListItem, NoSsr } from "@mui/material";
import { Draggable, resetServerContext } from "react-beautiful-dnd";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";
import { QuestionType } from "../../../types/question/question";
import QuestionBlockCard from "./QuestionBlockCard";

type Props = {
  question: QuestionType;
  index: number;
};

const QuestionBlockListItem = ({ question, index }: Props) => {
  const lockExperimentContext = useLockExperimentContext();

  return (
    <NoSsr>
      <Draggable
        key={question._id.toString()}
        draggableId={`section-detail-list-draggable-${question._id.toString()}`}
        index={index}
        isDragDisabled={lockExperimentContext.isExperimentLocked}
      >
        {(provided, snapshot) => (
          <ListItem
            key={question._id.toString()}
            ref={provided.innerRef}
            className={snapshot.isDragging ? "bg-gray-50" : ""}
            sx={{ display: "list-item", padding: 0 }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <QuestionBlockCard
              question={question}
              index={index}
              locked={!!lockExperimentContext.isExperimentLocked}
            />
          </ListItem>
        )}
      </Draggable>
    </NoSsr>
  );
};

QuestionBlockListItem.getInitialProps = async (context) => {
  resetServerContext();
  return {};
};

export default QuestionBlockListItem;
