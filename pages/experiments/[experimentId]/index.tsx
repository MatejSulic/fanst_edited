import { Box } from "@mui/system";
import { useRouter } from "next/router";
import AppBar from "../../../components/common/AppBar";
import ContentWrapper from "../../../components/common/layout/ContentWrapper";
import ExperimentDetailList from "../../../components/experiments/experiment-detail/ExperimentDetailList";
import ExperimentDetailPageToolbar from "../../../components/experiments/experiment-detail/ExperimentDetailPageToolbar";
import SectionList from "../../../components/experiments/section-list-aside/SectionList";
import Breadcrumbs from "../../../components/MuiOverrides/Breadcrumbs";

const ExperimentDetailPage = () => {
  const router = useRouter();
  const { experimentId } = router.query;

  return (
    <>
      <AppBar />
      <ContentWrapper>
        <Breadcrumbs />
        <Box className="space-y-4">
          <ExperimentDetailPageToolbar />
        </Box>

        <Box className="flex gap-8 h-5/6">
          <aside>
            <SectionList />
          </aside>

          <main>
            <ExperimentDetailList />
          </main>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default ExperimentDetailPage;
