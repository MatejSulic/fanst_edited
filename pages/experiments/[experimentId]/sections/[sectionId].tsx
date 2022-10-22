import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import AppBar from "../../../../src/Components/common/AppBar";
import Breadcrumbs from "../../../../src/Components/common/Breadcrumbs";
import SectionList from "../../../../src/Components/common/experiments/SectionList";
import SectionDetailList from "../../../../src/Components/common/experiments/sections/SectionDetailList";
import SectionSettingsCard from "../../../../src/Components/common/experiments/sections/SectionSettingsCard";
import ContentWrapper from "../../../../src/Components/common/layout/ContentWrapper";

const SectionDetailPage = () => {
  // TODO: experiment id from url
  const router = useRouter();
  const { experimentId, sectionId } = router.query;

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
            <SectionDetailList sectionId={sectionId as string} />
          </main>

          <aside>
            <SectionSettingsCard sectionId={sectionId as string} />
          </aside>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default SectionDetailPage;
