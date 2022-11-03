import CloseIcon from "@mui/icons-material/Close";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import QuestionBlockListItem from "./QuestionBlockListItem";

type Props = {
  sectionId: string;
  items: number[];
  onDragEnd: (res: DropResult) => void;
};

const SectionDetailList = ({ sectionId, items, onDragEnd }: Props) => {
  const [loadedInBrowser, setloadedInBrowser] = useState(false);

  useEffect(() => {
    setloadedInBrowser(true);
  }, []);

  return loadedInBrowser ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card variant="outlined" className="max-h-full overflow-y-auto">
        <CardHeader
          action={
            <Tooltip title="Close section detail">
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          }
          title={<Typography variant="h6">Section {sectionId}</Typography>}
          className="pb-0"
        />
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
              dignissim eros. Ut eu imperdiet augue. Phasellus porttitor ante
              ante, eget condimentum sem convallis eget. Sed sed enim ut arcu
              suscipit fermentum.
            </Typography>
            <Droppable droppableId="section-detail-list-droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <List sx={{ p: 0, m: 0 }}>
                    <Stack spacing={1}>
                      {items.map((item, idx) => (
                        <QuestionBlockListItem
                          key={item}
                          item={item}
                          index={idx}
                        />
                      ))}
                    </Stack>
                  </List>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Stack>
        </CardContent>
      </Card>
    </DragDropContext>
  ) : null;
};

SectionDetailList.getInitialProps = async (context) => {
  resetServerContext();
  return {};
};

export default SectionDetailList;
