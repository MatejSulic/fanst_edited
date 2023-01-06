import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import ContentWrapper from "../../../../../components/common/layout/ContentWrapper";
import PublicAppBar from "../../../../../components/public/common/PublicAppBar";
import ExperimentConsentRemovedCard from "../../../../../components/public/experiment/ExperimentConsentRemovedCard";
import { useExperiment } from "../../../../../hooks/experiments/useExperiments";

const ExperimentConsentRemovedPage = () => {
  const router = useRouter();
  const { experimentId, participantId } = router.query;

  const {
    data: experiment,
    isLoading: experimentIsLoading,
    isError: experimentIsError,
  } = useExperiment(experimentId as string | undefined);

  if (experimentIsLoading || !router.isReady) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (experimentIsError) {
    return <Typography variant="h1">Error</Typography>;
  }

  return (
    <>
      <PublicAppBar />
      <ContentWrapper>
        <ExperimentConsentRemovedCard
          experiment={experiment}
          participantId={participantId as string}
        />
      </ContentWrapper>
    </>
  );
};

export default ExperimentConsentRemovedPage;
