import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentWrapper from "../../../../../components/common/layout/ContentWrapper";
import PublicAppBar from "../../../../../components/public/common/PublicAppBar";
import ExperimentSectionCard from "../../../../../components/public/experiment/ExperimentSectionCard";
import ExperimentWithdrawConsentCard from "../../../../../components/public/experiment/ExperimentWithdrawConsentCard";
import {
  useCreateExperimentProgressMutation,
  usePublicExperimentProgress,
  useUpdateExperimentProgressMutation,
} from "../../../../../hooks/public/experiment-progress/useExperimentProgresses";
import { usePublicExperiment } from "../../../../../hooks/public/experiments/useExperiments";
import { useSections } from "../../../../../hooks/sections/useSections";
import { UpdateSectionResultsType } from "../../../../../types/experimentProgress";

const ExperimentPreviewPage = () => {
  const router = useRouter();
  const { experimentId, participantId } = router.query;
  const [localSectionIdx, setLocalSectionIdx] = useState(0);

  const {
    data: experiment,
    isLoading: experimentIsLoading,
    isError: experimentIsError,
  } = usePublicExperiment(experimentId as string | undefined);

  const {
    data: experimentProgress,
    isLoading: experimentProgressIsLoading,
    isError: experimentProgressIsError,
  } = usePublicExperimentProgress(
    experimentId as string | undefined,
    participantId as string | undefined
  );

  const createExperimentProgressMutation = useCreateExperimentProgressMutation(
    experimentId as string,
    participantId as string
  );

  const experimentProgressMutation = useUpdateExperimentProgressMutation(
    experimentId as string,
    participantId as string
  );

  const {
    data: sections,
    isLoading: sectionsIsLoading,
    isError: sectionsIsError,
  } = useSections(experimentId as string | undefined);

  // Create progress record as soon as we know it doesn't exist yet
  useEffect(() => {
    if (
      !experimentProgressIsLoading &&
      experimentProgress === null &&
      !createExperimentProgressMutation.isLoading &&
      !createExperimentProgressMutation.isSuccess
    ) {
      createExperimentProgressMutation.mutate();
    }
  }, [experimentProgress, experimentProgressIsLoading]);

  if (
    experimentIsLoading ||
    experimentProgressIsLoading ||
    sectionsIsLoading ||
    !router.isReady
  ) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (experimentIsError || experimentProgressIsError || sectionsIsError) {
    return <Typography variant="h1">Failed to load the experiment. Please check your link or try again later.</Typography>;
  }

  const isFinished = localSectionIdx >= sections.length;
  const currentSection = isFinished ? null : sections[localSectionIdx];

  const handleSectionSubmit = (results: UpdateSectionResultsType) => {
    // Only write to DB for non-INTRODUCTION sections, and only if not already submitted
    if (results.sectionType !== "INTRODUCTION" && experimentProgress !== null) {
      const alreadySubmitted = (experimentProgress.sectionResults as any[])?.some(
        (r) => r.sectionId?.toString() === results.sectionId
      );
      if (!alreadySubmitted) {
        experimentProgressMutation.mutate({ sectionResults: results });
      }
    }
    setLocalSectionIdx((prev) => prev + 1);
  };

  return (
    <>
      <PublicAppBar />
      <ContentWrapper>
        {isFinished ? (
          <ExperimentWithdrawConsentCard
            experiment={experiment}
            participantId={participantId as string}
          />
        ) : (
          <ExperimentSectionCard
            section={currentSection}
            submitSection={handleSectionSubmit}
          />
        )}
      </ContentWrapper>
    </>
  );
};

export default ExperimentPreviewPage;
