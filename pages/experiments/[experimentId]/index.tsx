import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import AppBar from "../../../components/common/AppBar";
import ContentWrapper from "../../../components/common/layout/ContentWrapper";
import ExperimentDetailList from "../../../components/experiments/experiment-detail/ExperimentDetailList";
import ExperimentDetailPageToolbar from "../../../components/experiments/experiment-detail/ExperimentDetailPageToolbar";
import SectionList from "../../../components/experiments/section-list-aside/SectionList";
import { LockExperimentContextProvider } from "../../../contexts/experiments/lockExperimentContext";
import { useExperiment } from "../../../hooks/experiments/useExperiments";
import {
  useSections,
  useUpdateSectionMutation,
} from "../../../hooks/sections/useSections";

const ExperimentDetailPage = () => {
  const router = useRouter();
  const { experimentId } = router.query;
  const {
    data: sections,
    isLoading,
    isError,
  } = useSections(experimentId as string | undefined);

  const {
    data: experiment,
    isLoading: experimentIsLoading,
    isError: experimentIsError,
  } = useExperiment(experimentId as string | undefined);

  const undefinedSectionMutation = useUpdateSectionMutation(
    experimentId as string
  );

  const handleOnDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.source.droppableId !== result.destination?.droppableId ||
      result.source.index === result.destination.index
    ) {
      return;
    }

    const movedSection = sections?.find(
      (sec) => result.source.index === sec.position
    );

    undefinedSectionMutation.mutate({
      secId: movedSection?._id.toString(),
      sectionData: { position: result.destination?.index },
    });
  };

  if (isLoading || experimentIsLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError || experimentIsError) {
    return <Typography variant="h1">Error</Typography>;
  }

  return experiment ? (
    <>
      <AppBar />
      <ContentWrapper>
        <LockExperimentContextProvider experimentId={experiment._id.toString()}>
          {/* <Box sx={{ width: "100%" }}>
            <Breadcrumbs />
          </Box> */}
          <ExperimentDetailPageToolbar />

          <Box sx={{ display: "flex", gap: 4, height: "83.3%", mt: 2 }}>
            <aside>
              <SectionList sections={sections} />
            </aside>

            <main>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <ExperimentDetailList
                  experiment={experiment}
                  sections={sections}
                />
              </DragDropContext>
            </main>
          </Box>
        </LockExperimentContextProvider>
      </ContentWrapper>
    </>
  ) : null;
};

export default ExperimentDetailPage;
