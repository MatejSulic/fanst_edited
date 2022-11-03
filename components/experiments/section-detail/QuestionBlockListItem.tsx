import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  ListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Draggable, resetServerContext } from "react-beautiful-dnd";

type Props = {
  item: number;
  index: number;
};

const QuestionBlockListItem = ({ item, index }: Props) => {
  const [loadedInBrowser, setloadedInBrowser] = useState(false);

  useEffect(() => {
    setloadedInBrowser(true);
  }, []);

  return loadedInBrowser ? (
    <Draggable
      key={item}
      draggableId={`section-detail-list-draggable-${String(item)}`}
      index={index}
    >
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          className={snapshot.isDragging ? "bg-gray-50" : ""}
          sx={{ display: "list-item", padding: 0 }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardActionArea>
              <CardHeader
                title={
                  <Typography
                    variant="subtitle1"
                    className="flex justify-center"
                  >
                    {item} - Which image is more symmetrical?
                  </Typography>
                }
                sx={{ pb: 0 }}
              />
              <CardContent>
                <Box
                  sx={{ display: "flex", justifyContent: "center", gap: 16 }}
                >
                  <Image
                    src="https://picsum.photos/200"
                    alt="first image"
                    width={200}
                    height={200}
                  />
                  <Image
                    src="https://picsum.photos/200"
                    alt="second image"
                    width={200}
                    height={200}
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </ListItem>
      )}
    </Draggable>
  ) : null;
};

QuestionBlockListItem.getInitialProps = async (context) => {
  resetServerContext();
  return {};
};

export default QuestionBlockListItem;
