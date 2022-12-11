import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import ContentWrapper from "../../../../components/common/layout/ContentWrapper";
import PublicAppBar from "../../../../components/public/common/PublicAppBar";
import ExperimentWithdrawConsentCard from "../../../../components/public/experiment/ExperimentWithdrawConsentCard";
import ExperimentSectionCard from "../../../../components/public/experiment/ExperimentSectionCard";
import ExperimentStartCard from "../../../../components/public/experiment/ExperimentStartCard";
import { useExperiment } from "../../../../hooks/experiments/useExperiments";
import {
  useExperimentProgress,
  useUpdateExperimentProgressMutation,
} from "../../../../hooks/public/experiment-progress/useExperimentProgresses";
import { useSections } from "../../../../hooks/sections/useSections";
import {
  SectionResults,
  UpdateSectionResultsType,
} from "../../../../types/experimentProgress";

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

  const experimentProgressMutation = useUpdateExperimentProgressMutation(
    experimentId as string
  );

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

  const experimentFinished = !!experimentProgress?.finished;

  // experimentProgress does not exist yet - first time opening the experiment
  const currentSection =
    experimentProgress === null
      ? null
      : sections[experimentProgress.currentSectionIdx];

  const handleSectionSubmit = (results: UpdateSectionResultsType) => {
    experimentProgressMutation.mutate({
      experimentProgressData: {
        sectionResults: results,
      },
    });
  };

  return (
    <>
      <PublicAppBar />
      <ContentWrapper>
        {experimentFinished ? (
          <ExperimentWithdrawConsentCard experiment={experiment} />
        ) : currentSection === null ? (
          <ExperimentStartCard experiment={experiment} />
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
