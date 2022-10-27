import { Box } from "@mui/system";
import { useRouter } from "next/router";
import AppBar from "../../../components/common/AppBar";
import Breadcrumbs from "../../../components/MuiOverrides/Breadcrumbs";
import ContentWrapper from "../../../components/common/layout/ContentWrapper";
import ExperimentDetailList from "../../../components/experiments/ExperimentDetailList";
import ExperimentDetailPageToolbar from "../../../components/experiments/ExperimentDetailPageToolbar";
import SectionList from "../../../components/experiments/SectionList";

const ExperimentDetailPage = () => {
  // TODO: experiment id from url
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
            <ExperimentDetailList experimentId={experimentId as string} />
          </main>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default ExperimentDetailPage;
