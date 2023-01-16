import { Button, Card, CardActions, NoSsr } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
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

type Props = {
  section: SectionType;
  questions: QuestionType[];
  onDragEnd: (res: DropResult) => void;
};

const SectionDetailCard = ({ section, questions, onDragEnd }: Props) => {
  const router = useRouter();
  const { experimentId, sectionId } = router.query;
  const [newQuestionDialogOpen, setNewQuestionDialogOpen] = useState(false);

  const lockExperimentContext = useLockExperimentContext();

  const { register, setValue, onSubmit, errors } =
    useUpdateSectionFormContext();

  return (
    <NoSsr>
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
            <SectionCardHeader
              sectionTitle={section.title}
              experimentId={experimentId as string}
            />
            <SectionCardContent
              sectionDescription={section.description}
              questions={questions}
            />
            {!lockExperimentContext.isExperimentLocked && (
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  p: 2,
                }}
              >
                {section.type === "BLANK" && (
                  <Button
                    variant="outlined"
                    onClick={() => setNewQuestionDialogOpen(true)}
                  >
                    Add New Question
                  </Button>
                )}
                <Button type="submit" variant="contained">
                  Save section
                </Button>
              </CardActions>
            )}
          </form>
        </Card>
      </DragDropContext>
      {section.type === "BLANK" &&
        !lockExperimentContext.isExperimentLocked && (
          <NewQuestionDialog
            open={newQuestionDialogOpen}
            onClose={() => setNewQuestionDialogOpen(false)}
            onSave={() => setNewQuestionDialogOpen(false)}
          />
        )}
    </NoSsr>
  );
};

SectionDetailCard.getInitialProps = async (context) => {
  resetServerContext();
  return {};
};

export default SectionDetailCard;
