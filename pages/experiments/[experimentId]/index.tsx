import { Stack, Typography } from "@mui/material";
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

  const undefinedSectionUpdateMutation = useUpdateSectionMutation(
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

    undefinedSectionUpdateMutation.mutate({
      secId: movedSection?._id.toString(),
      sectionData: { position: result.destination?.index },
    });
  };

  if (isLoading || experimentIsLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError || experimentIsError) {
    return <Typography variant="h1">Failed to load experiment. Please try again later.</Typography>;
  }

  return experiment ? (
    <>
      <AppBar />
      <ContentWrapper>
        <LockExperimentContextProvider experimentId={experiment._id.toString()}>
          <ExperimentDetailPageToolbar />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 0 }}
            sx={{
              // display: { xs: "block", md: "flex" },
              gap: 2,
              height: { md: "100%" },
              maxWidth: "100%",
              width: "100%",
              px: { md: 2 },
              mt: 2,
              pb: 2,
              overflow: "hidden",
            }}
          >
            <aside>
              <SectionList sections={sections} />
            </aside>

            <main
              style={{ width: "100%", maxHeight: "100%", overflowY: "auto" }}
            >
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <ExperimentDetailList
                  experiment={experiment}
                  sections={sections}
                />
              </DragDropContext>
            </main>
          </Stack>
        </LockExperimentContextProvider>
      </ContentWrapper>
    </>
  ) : null;
};

export default ExperimentDetailPage;
