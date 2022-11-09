import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ExperimentType } from "../../../types/experiment";
import { SectionType } from "../../../types/section/section";
import SectionBlock from "./SectionBlock";

type Props = {
  experiment: ExperimentType;
  sections: SectionType[];
};

const ExperimentDetailList = ({ experiment, sections }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: (theme) => theme.breakpoints.values["md"],
        maxWidth: (theme) => theme.breakpoints.values["md"],
        maxHeight: "100%",
        overflowY: "auto",
      }}
    >
      <CardHeader
        title={<Typography variant="h6">{experiment.title}</Typography>}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body2">{experiment.description}</Typography>

          <Stack spacing={1}>
            {sections.map((item) => (
              <SectionBlock key={item._id.toString()} section={item} />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ExperimentDetailList;
