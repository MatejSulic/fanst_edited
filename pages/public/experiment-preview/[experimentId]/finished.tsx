import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import ContentWrapper from "../../../../components/common/layout/ContentWrapper";
import PublicAppBar from "../../../../components/public/common/PublicAppBar";
import ExperimentFinishedCard from "../../../../components/public/experiment/ExperimentFinishedCard";
import { useExperiment } from "../../../../hooks/experiments/useExperiments";

const ExperimentFinishedPage = () => {
  const router = useRouter();
  const { experimentId } = router.query;

  const {
    data: experiment,
    isLoading: experimentIsLoading,
    isError: experimentIsError,
  } = useExperiment(experimentId as string | undefined);

  if (experimentIsLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (experimentIsError) {
    return <Typography variant="h1">Error</Typography>;
  }

  return (
    <>
      <PublicAppBar />
      <ContentWrapper>
        <ExperimentFinishedCard experiment={experiment} />
      </ContentWrapper>
    </>
  );
};

export default ExperimentFinishedPage;
