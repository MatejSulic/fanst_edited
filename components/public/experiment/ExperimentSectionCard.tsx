import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SectionType } from "../../../types/section/section";

type Props = {
  section: SectionType;
};

const ExperimentSectionCard = ({ section }: Props) => {
  const [sectionResults, setSectionResults] = useState();

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardHeader
        title={<Typography variant="h6">{section.title}</Typography>}
        sx={{ textAlign: "center" }}
      />
      <CardContent></CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button type="submit" variant="contained">
          Next
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExperimentSectionCard;
