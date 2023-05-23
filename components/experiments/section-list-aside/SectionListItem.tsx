import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
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
    <Box
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
        // boxSizing: "border-box",
        // minWidth: 200,
        // maxWidth: "100%",
        // width: "100%",
        p: 1,
      }}
    >
      {/* <ListItem
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
          minWidth: { xs: 400 },
        }}
      > */}
      <Typography variant="h6" component="div">
        {idx}
      </Typography>
      <Card
        sx={{
          backgroundColor: (theme) =>
            activeSectionId === section._id.toString()
              ? theme.palette.action.selected
              : undefined,
          // maxWidth: "80%",
          // width: "80%",
          minWidth: 200,
          // height: 120,
        }}
      >
        <CardHeader
          title={
            <Typography variant="subtitle1" component="div">
              <TextTruncate
                textElement="span"
                // containerClassName="text-gray-500 text-sm pt-2"
                line={1}
                text={section.title}
              />
            </Typography>
          }
          sx={{ pb: 0 }}
        />
        <CardContent>
          <Typography variant="body2" component="div">
            <TextTruncate line={2} element="span" text={section.description} />
          </Typography>
        </CardContent>
      </Card>
      {/* </ListItem> */}
    </Box>
  );
};

export default SectionListItem;
