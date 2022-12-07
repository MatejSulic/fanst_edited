import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import AppBar from "../../../components/common/AppBar";
import ContentWrapper from "../../../components/common/layout/ContentWrapper";
import ExperimentDetailList from "../../../components/experiments/experiment-detail/ExperimentDetailList";
import ExperimentDetailPageToolbar from "../../../components/experiments/experiment-detail/ExperimentDetailPageToolbar";
import SectionList from "../../../components/experiments/section-list-aside/SectionList";
import Breadcrumbs from "../../../components/MuiOverrides/Breadcrumbs";
import { useSections } from "../../../hooks/sections/useSections";
import { useExperiments } from "../../../hooks/experiments/useExperiments";

const ExperimentDetailPage = () => {
  const router = useRouter();
  const { experimentId } = router.query;
  const {
    data: sections,
    isLoading,
    isError,
  } = useSections(experimentId as string | undefined);

  const {
    data: experiments,
    isLoading: experimentsIsLoading,
    isError: experimentsIsError,
  } = useExperiments();

  if (isLoading || experimentsIsLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError || experimentsIsError) {
    return <Typography variant="h1">Error</Typography>;
  }

  const currentExperiment = experiments.find(
    (item) => item._id.toString() === experimentId
  )!;

  return currentExperiment ? (
    <>
      <AppBar />
      <ContentWrapper>
        <Breadcrumbs />
        <Box className="space-y-4">
          <ExperimentDetailPageToolbar />
        </Box>

        <Box className="flex gap-8 h-5/6">
          <aside>
            <SectionList sections={sections} />
          </aside>

          <main>
            {experiments.length > 0 && (
              <ExperimentDetailList
                experiment={
                  experiments.find(
                    (item) => item._id.toString() === experimentId
                  )!
                }
                sections={sections}
              />
            )}
          </main>
        </Box>
      </ContentWrapper>
    </>
  ) : null;
};

export default ExperimentDetailPage;
