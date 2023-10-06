import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppBar from "../../../../components/common/AppBar";
import ContentWrapper from "../../../../components/common/layout/ContentWrapper";
import ExperimentDetailPageToolbar from "../../../../components/experiments/experiment-detail/ExperimentDetailPageToolbar";
import SectionDetailCard from "../../../../components/experiments/section-detail/SectionDetailCard";
import SectionSettingsCardAside from "../../../../components/experiments/section-detail/SectionSettingsCardAside";
import SectionList from "../../../../components/experiments/section-list-aside/SectionList";
import { IsSectionEditableContextProvider } from "../../../../contexts/experiments/experiment-detail/section-detail/isSectionEditableContext";
import { UpdateSectionFormContextProvider } from "../../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { LockExperimentContextProvider } from "../../../../contexts/experiments/lockExperimentContext";
import { useSectionQuestions } from "../../../../hooks/questions/useQuestions";
import { useSections } from "../../../../hooks/sections/useSections";
import useUpdateSectionForm from "../../../../hooks/sections/useUpdateSectionForm";
import { SectionType } from "../../../../types/section/section";
import { QuestionType } from "../../../../types/question/question";

const SectionDetailPage = () => {
  const router = useRouter();
  const { experimentId, sectionId } = router.query;
  const [currentSection, setCurrentSection] = useState<SectionType | null>(
    null
  );
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

  const {
    register,
    setValue,
    onSubmit,
    reset,
    errors,
    data,
    getValues,
    watch,
  } = useUpdateSectionForm(experimentId as string, sectionId as string);

  useEffect(() => {
    if (sections) {
      setCurrentSection(
        sections.find((item) => item._id.toString() === sectionId)!
      );
    }
    reset();
  }, [sectionId, sections, questions, reset]);

  if (isLoading || sectionsIsLoading || !router.isReady) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError || sectionsIsError) {
    return <Typography variant="h1">Error</Typography>;
  }

  const isSectionEditable = currentSection?.type === "BLANK";
  const editableQuestionTypes: QuestionType["type"][] = [
    "2AFC",
    "IMAGE_SELECT",
    "DRAW_LINE",
    "SINGLE_IMAGE_TWO_CHOICES",
    "SINGLE_IMAGE_ANGLE",
    "SINGLE_IMAGE_INPUT_VALUE",
    "SINGLE_IMAGE_TWO_CHOICES_CALIBRATION",
  ];
  const sectionHasEditableQuestion = Boolean(
    questions.find((question) => editableQuestionTypes.includes(question.type))
  );
  const sectionHasEditableSettings =
    currentSection?.type === "2AFC" || sectionHasEditableQuestion;

  return currentSection ? (
    <>
      <AppBar />
      <ContentWrapper>
        <LockExperimentContextProvider experimentId={experimentId as string}>
          <UpdateSectionFormContextProvider
            value={{ register, setValue, onSubmit, data, getValues, watch }}
          >
            <IsSectionEditableContextProvider value={{ isSectionEditable }}>
              {/* <Box sx={{ width: "100%" }}>
                <Breadcrumbs />
              </Box> */}
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
                }}
              >
                <aside>
                  <SectionList sections={sections} />
                </aside>

                <Stack
                  direction={{ sm: "column", md: "row-reverse" }}
                  spacing={2}
                  sx={{
                    // display: { md: "flex" },
                    maxWidth: "100%",
                    width: "100%",
                    gap: 2,
                    // alignItems: { sm: "center", md: "unset" },
                  }}
                >
                  {sectionHasEditableSettings && (
                    <SectionSettingsCardAside
                      key={currentSection._id.toString()}
                      section={currentSection}
                    />
                  )}

                  <main style={{ flexGrow: 1 }}>
                    <SectionDetailCard
                      key={currentSection._id.toString()}
                      section={currentSection}
                      questions={questions}
                    />
                  </main>
                </Stack>
              </Stack>
            </IsSectionEditableContextProvider>
          </UpdateSectionFormContextProvider>
        </LockExperimentContextProvider>
      </ContentWrapper>
    </>
  ) : null;
};

export default SectionDetailPage;
