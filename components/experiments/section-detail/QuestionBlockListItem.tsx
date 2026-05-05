import { Draggable } from "react-beautiful-dnd";
import { useIsSectionEditableContext } from "../../../contexts/experiments/experiment-detail/section-detail/isSectionEditableContext";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";
import { QuestionType } from "../../../types/question/question";
import QuestionBlockCard from "./QuestionBlockCard";

type Props = {
  question: QuestionType;
};

const QuestionBlockListItem = ({ question }: Props) => {
  const lockExperimentContext = useLockExperimentContext();
  const { isSectionEditable } = useIsSectionEditableContext();

  return (
    <Draggable
      key={question._id.toString()}
      index={question.position}
      draggableId={`section-detail-list-draggable-${question._id.toString()}`}
      isDragDisabled={
        lockExperimentContext.isExperimentLocked || !isSectionEditable
      }
    >
      {(provided, snapshot) => (
        <div
          key={question._id.toString()}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <QuestionBlockCard
            question={question}
            locked={!!lockExperimentContext.isExperimentLocked}
          />
        </div>
      )}
    </Draggable>
  );
};

export default QuestionBlockListItem;
