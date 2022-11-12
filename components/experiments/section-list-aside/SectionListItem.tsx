import {
  Card,
  CardContent,
  CardHeader,
  ListItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import TextTruncate from "react-text-truncate";
import { SectionType } from "../../../types/section/section";

type Props = {
  idx: number;
  section: SectionType;
  activeExperimentId: string;
  activeSectionId?: string;
};

const SectionListItem = ({
  idx,
  section,
  activeExperimentId,
  activeSectionId,
}: Props) => {
  return (
    <ListItem
      component={Link}
      href={`/experiments/${activeExperimentId}/sections/${section._id.toString()}`}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        backgroundColor: (theme) =>
          activeSectionId === section._id.toString()
            ? theme.palette.action.selected
            : undefined,
      }}
    >
      <Typography variant="h6" component="div">
        {idx}
      </Typography>
      <Card
        sx={{
          backgroundColor: (theme) =>
            activeSectionId === section._id.toString()
              ? theme.palette.action.selected
              : undefined,
        }}
      >
        <CardHeader
          title={
            <Typography variant="subtitle1" component="div">
              {section.title}
            </Typography>
          }
          className="pb-0"
        />
        <CardContent>
          <Typography variant="body2" component="div">
            <TextTruncate line={4} element="span" text={section.description} />
          </Typography>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default SectionListItem;
