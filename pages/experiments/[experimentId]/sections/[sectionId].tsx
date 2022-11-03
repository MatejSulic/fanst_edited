import { Box } from "@mui/material";
import { useRouter } from "next/router";
import AppBar from "../../../../components/common/AppBar";
import Breadcrumbs from "../../../../components/MuiOverrides/Breadcrumbs";
import ContentWrapper from "../../../../components/common/layout/ContentWrapper";
import SectionDetailPageToolbar from "../../../../components/experiments/section-detail/SectionDetailPageToolbar";
import SectionList from "../../../../components/experiments/SectionList";
import SectionDetailList from "../../../../components/experiments/section-detail/SectionDetailCard";
import SectionSettingsCard from "../../../../components/experiments/section-detail/SectionSettingsCard";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { reorderList } from "../../../../utils/list";

const SectionDetailPage = () => {
  const [items, setItems] = useState(() => [...Array(10).keys()]);
  // TODO: experiment id from url
  const router = useRouter();
  const { experimentId, sectionId } = router.query;

  const handleDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorderList(items, source.index, destination.index);

    setItems(newItems);
  };

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

          <main className="pt-2">
            <SectionDetailList items={items} onDragEnd={handleDragEnd} />
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
