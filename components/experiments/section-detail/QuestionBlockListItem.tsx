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
import { QuestionType } from "../../../types/question";

type Props = {
  question: QuestionType;
  index: number;
};

const QuestionBlockListItem = ({ question, index }: Props) => {
  const [loadedInBrowser, setloadedInBrowser] = useState(false);

  useEffect(() => {
    setloadedInBrowser(true);
  }, []);

  return loadedInBrowser ? (
    <Draggable
      key={question.id}
      draggableId={`section-detail-list-draggable-${question.id}`}
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
                    {question.title}
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
