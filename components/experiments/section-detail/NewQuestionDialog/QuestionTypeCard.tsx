import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

type Props = {
  title?: string;
  subheader?: string;
  children?: React.ReactNode;
};

const QuestionTypeCard = ({ title, subheader, children }: Props) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: "100%" }}>
      <CardActionArea>
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
            <Box sx={{ opacity: 0.5, pointerEvents: "none" }}>{children}</Box>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};

export default QuestionTypeCard;
