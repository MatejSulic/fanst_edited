import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import ContentWrapper from "../../../../components/common/layout/ContentWrapper";
import PublicAppBar from "../../../../components/public/common/PublicAppBar";
import ExperimentSectionCard from "../../../../components/public/experiment/ExperimentSectionCard";
import ExperimentStartCard from "../../../../components/public/experiment/ExperimentStartCard";
import { useExperiment } from "../../../../hooks/experiments/useExperiments";
import { useExperimentProgress } from "../../../../hooks/public/experiment-progress/useExperimentProgresses";
import { useSections } from "../../../../hooks/sections/useSections";

const ExperimentPreviewPage = () => {
  const router = useRouter();
  const { experimentId } = router.query;
  const {
    data: experiment,
    isLoading: experimentIsLoading,
    isError: experimentIsError,
  } = useExperiment(experimentId as string | undefined);

  const {
    data: experimentProgress,
    isLoading: experimentProgressIsLoading,
    isError: experimentProgressIsError,
  } = useExperimentProgress(experimentId as string | undefined);

  const {
    data: sections,
    isLoading: sectionsIsLoading,
    isError: sectionsIsError,
  } = useSections(experimentId as string | undefined);

  if (experimentIsLoading || experimentProgressIsLoading || sectionsIsLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (experimentIsError || experimentProgressIsError || sectionsIsError) {
    return <Typography variant="h1">Error</Typography>;
  }

  // experimentProgress does not exist yet - first time opening the experiment
  const currentSection =
    experimentProgress === null
      ? null
      : sections[experimentProgress.currentSectionIdx];

  return (
    <>
      <PublicAppBar />
      <ContentWrapper>
        {currentSection === null ? (
          <ExperimentStartCard experiment={experiment} />
        ) : (
          <ExperimentSectionCard section={currentSection} />
        )}
      </ContentWrapper>
    </>
  );
};

export default ExperimentPreviewPage;
