import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import AppBar from "../../../../components/common/AppBar";
import ContentWrapper from "../../../../components/common/layout/ContentWrapper";
import ExperimentDetailPageToolbar from "../../../../components/experiments/experiment-detail/ExperimentDetailPageToolbar";
import AFCSectionDetail from "../../../../components/experiments/section-detail/SectionDetailCard/AFCSectionDetail";
import BlackSectionDetail from "../../../../components/experiments/section-detail/SectionDetailCard/BlankSectionDetail";
import SectionSettingsCard from "../../../../components/experiments/section-detail/SectionSettingsCard";
import SectionList from "../../../../components/experiments/section-list-aside/SectionList";
import Breadcrumbs from "../../../../components/MuiOverrides/Breadcrumbs";
import { useSectionQuestions } from "../../../../hooks/experiments/experiment-detail/useQuestions";
import { useSections } from "../../../../hooks/experiments/experiment-detail/useSections";
import { reorderList } from "../../../../utils/list";

const SectionDetailPage = () => {
  const [items, setItems] = useState(() => [...Array(10).keys()]);
  const router = useRouter();
  const { experimentId, sectionId } = router.query;
  const {
    data: questions,
    isLoading,
    isError,
  } = useSectionQuestions(
    experimentId as string | undefined,
    sectionId as string | undefined
  );
  const {
    data: sections,
    isLoading: sectionsIsLoading,
    isError: sectionsIsError,
  } = useSections(experimentId as string | undefined);

  const handleDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorderList(items, source.index, destination.index);

    setItems(newItems);
  };

  if (isLoading || sectionsIsLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError || sectionsIsError) {
    return <Typography variant="h1">Error</Typography>;
  }

  const currentSection = sections.find(
    (item) => item._id.toString() === sectionId
  )!;

  return (
    <>
      <AppBar />
      <ContentWrapper>
        <Breadcrumbs />
        <ExperimentDetailPageToolbar />

        <Box className="flex gap-8 h-5/6">
          <aside>
            <SectionList sections={sections} />
          </aside>

          <main style={{ paddingTop: 8, maxWidth: "100%", width: "100%" }}>
            {currentSection.type === "BLANK" && (
              <BlackSectionDetail
                section={currentSection}
                questions={questions}
                onDragEnd={handleDragEnd}
              />
            )}
            {currentSection.type === "2AFC" && (
              <AFCSectionDetail
                section={currentSection}
                questions={questions}
              />
            )}
          </main>

          <aside>
            <SectionSettingsCard sectionId={sectionId as string} />
          </aside>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default SectionDetailPage;
