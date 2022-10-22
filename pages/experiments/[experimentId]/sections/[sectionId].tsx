import { Box } from "@mui/material";
import { useRouter } from "next/router";
import AppBar from "../../../../src/Components/common/AppBar";
import Breadcrumbs from "../../../../src/Components/common/Breadcrumbs";
import ContentWrapper from "../../../../src/Components/common/layout/ContentWrapper";
import SectionDetailPageToolbar from "../../../../src/Components/experiments/SectionDetailPageToolbar";
import SectionList from "../../../../src/Components/experiments/SectionList";
import SectionDetailList from "../../../../src/Components/experiments/sections/SectionDetailList";
import SectionSettingsCard from "../../../../src/Components/experiments/sections/SectionSettingsCard";

const SectionDetailPage = () => {
  // TODO: experiment id from url
  const router = useRouter();
  const { experimentId, sectionId } = router.query;

  return (
    <>
      <AppBar />
      <ContentWrapper>
        <Breadcrumbs />
        <SectionDetailPageToolbar />

        <Box className="flex gap-8 h-5/6">
          <aside>
            <SectionList />
          </aside>

          <main>
            <SectionDetailList sectionId={sectionId as string} />
          </main>

          <aside>
            <SectionSettingsCard />
          </aside>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default SectionDetailPage;
