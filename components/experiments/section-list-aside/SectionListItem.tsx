import {
  Card,
  CardContent,
  CardHeader,
  ListItem,
  Typography,
} from "@mui/material";
import TextTruncate from "react-text-truncate";
import { SectionType } from "../../../types/section";

type Props = {
  idx: number;
  section: SectionType;
};

const SectionListItem = ({ idx, section }: Props) => {
  return (
    <ListItem button className="flex items-start gap-4">
      <Typography variant="h6" component="div">
        {idx}
      </Typography>
      <Card>
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
