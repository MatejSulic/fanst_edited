import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import AppBar from "../../../src/Components/common/AppBar";
import Breadcrumbs from "../../../src/Components/common/Breadcrumbs";
import ExperimentDetailList from "../../../src/Components/common/experiments/ExperimentDetailList";
import SectionList from "../../../src/Components/common/experiments/SectionList";
import ContentWrapper from "../../../src/Components/common/layout/ContentWrapper";

const ExperimentDetailPage = () => {
  // TODO: experiment id from url
  const router = useRouter();
  const { experimentId } = router.query;

  return (
    <>
      <AppBar />
      <ContentWrapper>
        <Box className="flex justify-between">
          <Breadcrumbs />
          <Box className="flex justify start items-center gap-4">
            <Button variant="outlined">Experiment settings</Button>
            <Button variant="text">Preview experiment</Button>
          </Box>
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
