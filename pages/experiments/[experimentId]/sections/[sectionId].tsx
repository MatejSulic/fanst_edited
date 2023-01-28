import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { LockExperimentContextProvider } from "../../../../contexts/experiments/lockExperimentContext";
import { useSectionQuestions } from "../../../../hooks/questions/useQuestions";
import { useSections } from "../../../../hooks/sections/useSections";
import useUpdateSectionForm from "../../../../hooks/sections/useUpdateSectionForm";
import { SectionType } from "../../../../types/section/section";
import { reorderList } from "../../../../utils/list";

const SectionDetailPage = () => {
  const router = useRouter();
  const { experimentId, sectionId } = router.query;
  const [currentSection, setCurrentSection] = useState<SectionType | null>(
    null
  );
  const [items, setItems] = useState(() => [...Array(10).keys()]);
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

  const [register, setValue, onSubmit, reset, errors] = useUpdateSectionForm(
    experimentId as string,
    sectionId as string
  );

  useEffect(() => {
    if (sections) {
      setCurrentSection(
        sections.find((item) => item._id.toString() === sectionId)!
      );
    }
    reset();
  }, [sectionId, sections, reset]);

  const handleDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorderList(items, source.index, destination.index);

    setItems(newItems);
  };

  if (isLoading || sectionsIsLoading || !router.isReady) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError || sectionsIsError) {
    return <Typography variant="h1">Error</Typography>;
  }

  const isSectionEditable = currentSection?.type === "BLANK";
  const sectionHasEditableSettings =
    currentSection?.type === "BLANK" || currentSection?.type === "2AFC";

  return currentSection ? (
    <>
      <AppBar />
      <ContentWrapper>
        <LockExperimentContextProvider experimentId={experimentId as string}>
          <UpdateSectionFormContextProvider
            value={{ register, setValue, onSubmit, errors }}
          >
            <IsSectionEditableContextProvider value={{ isSectionEditable }}>
              <Box sx={{ width: "100%" }}>
                <Breadcrumbs />
              </Box>
              <ExperimentDetailPageToolbar />

              <Box
                sx={{ display: "flex", gap: 8, height: "83.3%", width: "100%" }}
              >
                <aside>
                  <SectionList sections={sections} />
                </aside>

                <main
                  style={{ paddingTop: 8, maxWidth: "100%", width: "100%" }}
                >
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
        </LockExperimentContextProvider>
      </ContentWrapper>
    </>
  ) : null;
};

export default SectionDetailPage;
