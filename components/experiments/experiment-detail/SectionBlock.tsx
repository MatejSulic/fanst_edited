import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Draggable } from "react-beautiful-dnd";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";
import { useDeleteSectionMutation } from "../../../hooks/sections/useSections";
import { SectionType } from "../../../types/section/section";

type Props = {
  section: SectionType;
};

const SectionBlock = ({ section }: Props) => {
  const router = useRouter();
  const { experimentId } = router.query;

  const deleteSectionMutation = useDeleteSectionMutation(
    experimentId as string,
    section._id.toString()
  );

  const lockExperimentContext = useLockExperimentContext();

  const handleSectionDelete = () => {
    deleteSectionMutation.mutate();
  };

  const handleNavigateToSectionDetail = () => {
    router.push(
      `/experiments/${experimentId}/sections/${section._id.toString()}`
    );
  };

  return (
    <>
      <Draggable
        key={section._id.toString()}
        draggableId={`experiment-detail-list-draggable-${section._id.toString()}`}
        index={section.position}
        isDragDisabled={lockExperimentContext.isExperimentLocked}
      >
        {(provided, snapshot) => (
          <div
            key={section._id.toString()}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              sx={{
                cursor: lockExperimentContext.isExperimentLocked
                  ? "pointer"
                  : undefined,
              }}
              onClick={
                lockExperimentContext.isExperimentLocked
                  ? handleNavigateToSectionDetail
                  : undefined
              }
            >
              <CardHeader
                title={
                  <Typography variant="subtitle1">{section.title}</Typography>
                }
                className="pb-0"
              />
              <CardContent>
                <Typography variant="body1">{section.description}</Typography>
              </CardContent>
              {!lockExperimentContext.isExperimentLocked && (
                <CardActions sx={{ display: "flex", gap: 4 }}>
                  <Link
                    href={`/experiments/${experimentId}/sections/${section._id.toString()}`}
                  >
                    <Button size="small">Edit Section</Button>
                  </Link>
                  <Button
                    color="warning"
                    size="small"
                    onClick={() => handleSectionDelete()}
                  >
                    Delete Section
                  </Button>
                </CardActions>
              )}
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default SectionBlock;
