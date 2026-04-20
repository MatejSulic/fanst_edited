import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import ContentWrapper from "../../../../../components/common/layout/ContentWrapper";
import PublicAppBar from "../../../../../components/public/common/PublicAppBar";
import ExperimentSectionCard from "../../../../../components/public/experiment/ExperimentSectionCard";
import ExperimentStartCard from "../../../../../components/public/experiment/ExperimentStartCard";
import ExperimentWithdrawConsentCard from "../../../../../components/public/experiment/ExperimentWithdrawConsentCard";
import {
  usePublicExperimentProgress,
  useUpdateExperimentProgressMutation,
} from "../../../../../hooks/public/experiment-progress/useExperimentProgresses";
import { usePublicExperiment } from "../../../../../hooks/public/experiments/useExperiments";
import { useSections } from "../../../../../hooks/sections/useSections";
import { UpdateSectionResultsType } from "../../../../../types/experimentProgress";
import { Background } from "@cloudinary/url-gen/qualifiers";

const ExperimentPreviewPage = () => {
  const router = useRouter();
  const { experimentId, participantId } = router.query;
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

  const experimentProgressMutation = useUpdateExperimentProgressMutation(
    experimentId as string,
    participantId as string
  );

  const {
    data: sections,
    isLoading: sectionsIsLoading,
    isError: sectionsIsError,
  } = useSections(experimentId as string | undefined);

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

  const experimentFinished = !!experimentProgress?.finished;

  // experimentProgress does not exist yet - first time opening the experiment
  const currentSection =
    experimentProgress === null
      ? null
      : sections[experimentProgress.currentSectionIdx];

  const handleSectionSubmit = (results: UpdateSectionResultsType) => {
    experimentProgressMutation.mutate({ sectionResults: results });
  };

  return (
    <>
      <PublicAppBar />
      <ContentWrapper>
        {experimentFinished ? (
          <ExperimentWithdrawConsentCard
            experiment={experiment}
            participantId={participantId as string}
          />
        ) : currentSection === null ? (
          <ExperimentStartCard
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
