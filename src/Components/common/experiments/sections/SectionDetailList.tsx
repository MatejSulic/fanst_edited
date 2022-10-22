import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import QuestionBlock from "./QuestionBlock";

type Props = {
  sectionId: string;
};

const SectionDetailList = ({ sectionId }: Props) => {
  return (
    <Card variant="outlined" className="max-h-full overflow-y-auto">
      <CardHeader
        action={
          <Tooltip title="Close section detail">
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        }
        title={<Typography variant="h5">Section {sectionId}</Typography>}
        className="pb-0"
      />
      <CardContent className="space-y-8">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
          dignissim eros. Ut eu imperdiet augue. Phasellus porttitor ante ante,
          eget condimentum sem convallis eget. Sed sed enim ut arcu suscipit
          fermentum.
        </Typography>

        <QuestionBlock />
        <QuestionBlock />
        <QuestionBlock />
        <QuestionBlock />
        <QuestionBlock />
      </CardContent>
    </Card>
  );
};

export default SectionDetailList;
