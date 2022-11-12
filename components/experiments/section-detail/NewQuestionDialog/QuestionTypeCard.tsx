import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export type QuestionTypeCardSharedProps = {
  onClick: () => void;
  selected: boolean;
};

type Props = {
  title?: string;
  subheader?: string;
  children?: React.ReactNode;
} & QuestionTypeCardSharedProps;

const QuestionTypeCard = ({
  title,
  subheader,
  children,
  onClick,
  selected,
}: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: "100%",
        backgroundColor: (theme) =>
          selected ? theme.palette.action.focus : undefined,
      }}
    >
      <CardActionArea onClick={() => onClick()}>
        {(title || subheader) && (
          <CardHeader
            title={
              title ? (
                <Typography variant="subtitle1">{title}</Typography>
              ) : undefined
            }
            subheader={
              subheader ? (
                <Typography variant="body2">{subheader}</Typography>
              ) : undefined
            }
          />
        )}
        {children && (
          <CardContent>
            <Box sx={{ opacity: 0.7, pointerEvents: "none" }}>{children}</Box>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};

export default QuestionTypeCard;
