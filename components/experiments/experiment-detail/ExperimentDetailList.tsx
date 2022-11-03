import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import SectionBlock from "./SectionBlock";

type Props = {
  experimentId: string;
};

const ExperimentDetailList = ({ experimentId }: Props) => {
  return (
    <Card variant="outlined" sx={{ maxHeight: "100%", overflowY: "auto" }}>
      <CardHeader
        title={<Typography variant="h6">Experiment {experimentId}</Typography>}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
            dignissim eros. Ut eu imperdiet augue. Phasellus porttitor ante
            ante, eget condimentum sem convallis eget. Sed sed enim ut arcu
            suscipit fermentum.
          </Typography>

          <SectionBlock />
          <SectionBlock />
          <SectionBlock />
          <SectionBlock />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ExperimentDetailList;
