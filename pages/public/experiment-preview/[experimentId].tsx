import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import ContentWrapper from "../../../components/common/layout/ContentWrapper";
import PublicAppBar from "../../../components/public/common/PublicAppBar";
import { useExperiment } from "../../../hooks/experiments/useExperiments";

const ExperimentPreviewPage = () => {
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
        <Box />
      </ContentWrapper>
    </>
  );
};

export default ExperimentPreviewPage;
