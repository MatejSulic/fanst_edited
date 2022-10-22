import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import SectionBlock from "./SectionBlock";

type Props = {
  experimentId: string;
};

const ExperimentDetailList = ({ experimentId }: Props) => {
  return (
    <Card variant="outlined" className="max-h-full overflow-y-auto">
      <CardHeader
        title={<Typography variant="h5">Experiment {experimentId}</Typography>}
        className="pb-0"
      />
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
            dignissim eros. Ut eu imperdiet augue. Phasellus porttitor ante
            ante, eget condimentum sem convallis eget. Sed sed enim ut arcu
            suscipit fermentum.
          </Typography>
        </div>

        <SectionBlock />
        <SectionBlock />
        <SectionBlock />
        <SectionBlock />
      </CardContent>
    </Card>
  );
};

export default ExperimentDetailList;
