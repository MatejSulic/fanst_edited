import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import AppBar from "../../../../components/common/AppBar";
import Breadcrumbs from "../../../../components/MuiOverrides/Breadcrumbs";
import ContentWrapper from "../../../../components/common/layout/ContentWrapper";
import SectionDetailPageToolbar from "../../../../components/experiments/section-detail/SectionDetailPageToolbar";
import SectionList from "../../../../components/experiments/section-list-aside/SectionList";
import SectionDetailList from "../../../../components/experiments/section-detail/SectionDetailCard";
import SectionSettingsCard from "../../../../components/experiments/section-detail/SectionSettingsCard";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { reorderList } from "../../../../utils/list";
import { useSections } from "../../../../hooks/experiments/experiment-detail/useSections";
import { useSectionQuestions } from "../../../../hooks/experiments/experiment-detail/useSectionDetail";

const SectionDetailPage = () => {
  const [items, setItems] = useState(() => [...Array(10).keys()]);
  const router = useRouter();
  const { experimentId, sectionId } = router.query;
  const {
    data: questions,
    isLoading,
    isError,
  } = useSectionQuestions(experimentId as string, sectionId as string);
  const {
    data: sections,
    isLoading: sectionsIsLoading,
    isError: sectionsIsError,
  } = useSections(experimentId as string);

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

  return (
    <>
      <AppBar />
      <ContentWrapper>
        <Breadcrumbs />
        <SectionDetailPageToolbar />

        <Box className="flex gap-8 h-5/6">
          <aside>
            <SectionList sections={sections} />
          </aside>

          <main style={{ paddingTop: 8, maxWidth: "100%", width: "100%" }}>
            <SectionDetailList
              section={
                sections.find((item) => item._id.toString() === sectionId)!
              }
              questions={questions}
              onDragEnd={handleDragEnd}
            />
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
