import { Box } from "@mui/system";
import { useRouter } from "next/router";
import AppBar from "../../../src/Components/common/AppBar";
import Breadcrumbs from "../../../src/Components/common/Breadcrumbs";
import ContentWrapper from "../../../src/Components/common/layout/ContentWrapper";
import ExperimentDetailList from "../../../src/Components/experiments/ExperimentDetailList";
import ExperimentDetailPageToolbar from "../../../src/Components/experiments/ExperimentDetailPageToolbar";
import SectionList from "../../../src/Components/experiments/SectionList";

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
