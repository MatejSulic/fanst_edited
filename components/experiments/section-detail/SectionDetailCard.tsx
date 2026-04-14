import { Button, Card, CardActions, NoSsr } from "@mui/material";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import { useUpdateSectionFormContext } from "../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";
import { QuestionType } from "../../../types/question/question";
import { SectionType } from "../../../types/section/section";
import NewQuestionDialog from "./NewQuestionDialog";
import SectionCardContent from "./SectionCardContent";
import SectionCardHeader from "./SectionCardHeader";
import {
  useBulkCreateQuestionsMutation,
  useUpdateQuestionMutation,
} from "../../../hooks/questions/useQuestions";
import { useIsSectionEditableContext } from "../../../contexts/experiments/experiment-detail/section-detail/isSectionEditableContext";
import { handleOpenCloudinaryMultiUploadWidget } from "../../../utils/cloudinaryFileUpload";

type Props = {
  section: SectionType;
  questions: QuestionType[];
};

const SectionDetailCard = ({ section, questions }: Props) => {
  const router = useRouter();
  const [newQuestionDialogOpen, setNewQuestionDialogOpen] = useState(false);
  const pendingPublicIds = useRef<string[]>([]);

  const lockExperimentContext = useLockExperimentContext();
  const { isSectionEditable } = useIsSectionEditableContext();
  const bulkCreateMutation = useBulkCreateQuestionsMutation(
    section.experimentId.toString(),
    section._id.toString()
  );
  const undefinedQuestionUpdateMutation = useUpdateQuestionMutation(
    section.experimentId.toString(),
    section._id.toString()
  );

  const { register, setValue, onSubmit } = useUpdateSectionFormContext();

  const handleOnDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.source.droppableId !== result.destination!.droppableId ||
      result.source.index === result.destination.index
    ) {
      return;
    }

    const movedQuestion = questions?.find(
      (sec) => result.source.index === sec.position
    );

    undefinedQuestionUpdateMutation.mutate({
      questId: movedQuestion?._id.toString(),
      questionData: { position: result.destination?.index },
    });
  };

  const onSave = () => {
    const { experimentId } = router.query;
    router.push(`/experiments/${experimentId}`);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          maxHeight: "100%",
          overflowY: "auto",
          maxWidth: "100%",
        }}
      >
        <form onSubmit={onSubmit(onSave)}>
          <SectionCardHeader
            sectionTitle={section.title}
            experimentId={section.experimentId.toString()}
          />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <SectionCardContent
              sectionDescription={section.description}
              questions={questions}
            />
          </DragDropContext>
          {!lockExperimentContext.isExperimentLocked && (
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                p: 2,
              }}
            >
              {isSectionEditable && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      pendingPublicIds.current = [];
                      handleOpenCloudinaryMultiUploadWidget({
                        onSuccess: (result) => {
                          pendingPublicIds.current.push(result.info.public_id);
                        },
                        onQueuesEnd: () => {
                          if (pendingPublicIds.current.length > 0) {
                            bulkCreateMutation.mutate({
                              imagePublicIds: pendingPublicIds.current,
                            });
                            pendingPublicIds.current = [];
                          }
                        },
                      });
                    }}
                  >
                    Bulk Add Questions
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setNewQuestionDialogOpen(true)}
                  >
                    Add New Question
                  </Button>
                </>
              )}
              <Button type="submit" variant="contained">
                Save section
              </Button>
            </CardActions>
          )}
        </form>
      </Card>

      {isSectionEditable && !lockExperimentContext.isExperimentLocked && (
        <NewQuestionDialog
          open={newQuestionDialogOpen}
          onClose={() => setNewQuestionDialogOpen(false)}
          onSave={() => setNewQuestionDialogOpen(false)}
        />
      )}
    </>
  );
};

export default SectionDetailCard;
