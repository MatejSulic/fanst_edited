import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import AppBar from "../../../../components/common/AppBar";
import ContentWrapper from "../../../../components/common/layout/ContentWrapper";
import ExperimentDetailPageToolbar from "../../../../components/experiments/experiment-detail/ExperimentDetailPageToolbar";
import SectionDetailCard from "../../../../components/experiments/section-detail/SectionDetailCard";
import SectionSettingsCard from "../../../../components/experiments/section-detail/SectionSettingsCard";
import SectionList from "../../../../components/experiments/section-list-aside/SectionList";
import Breadcrumbs from "../../../../components/MuiOverrides/Breadcrumbs";
import { IsSectionEditableContextProvider } from "../../../../contexts/experiments/experiment-detail/section-detail/isSectionEditableContext";
import { UpdateSectionFormContextProvider } from "../../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { useSectionQuestions } from "../../../../hooks/experiments/experiment-detail/useQuestions";
import { useSections } from "../../../../hooks/experiments/experiment-detail/useSections";
import useUpdateSectionForm from "../../../../hooks/experiments/experiment-detail/useUpdateSectionForm";
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

  const [register, setValue, onSubmit, errors] = useUpdateSectionForm(
    experimentId as string,
    sectionId as string
  );

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
  const isSectionEditable = currentSection.type === "BLANK";
  const sectionHasEditableSettings =
    currentSection.type === "BLANK" || currentSection.type === "2AFC";

  return currentSection ? (
    <>
      <AppBar />
      <ContentWrapper>
        <UpdateSectionFormContextProvider
          value={{ register, setValue, onSubmit, errors }}
        >
          <IsSectionEditableContextProvider value={{ isSectionEditable }}>
            <Breadcrumbs />
            <ExperimentDetailPageToolbar />

            <Box className="flex gap-8 h-5/6">
              <aside>
                <SectionList sections={sections} />
              </aside>

              <main style={{ paddingTop: 8, maxWidth: "100%", width: "100%" }}>
                <SectionDetailCard
                  key={currentSection._id.toString()}
                  section={currentSection}
                  questions={questions}
                  onDragEnd={handleDragEnd}
                />
              </main>

              {sectionHasEditableSettings && (
                <aside>
                  <SectionSettingsCard
                    key={currentSection._id.toString()}
                    section={currentSection}
                  />
                </aside>
              )}
            </Box>
          </IsSectionEditableContextProvider>
        </UpdateSectionFormContextProvider>
      </ContentWrapper>
    </>
  ) : null;
};

export default SectionDetailPage;
