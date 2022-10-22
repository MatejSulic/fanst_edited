import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";

const QuestionBlock = () => {
  return (
    <Card>
      <CardActionArea>
        <CardContent className="space-y-4">
          <Typography variant="h6" className="flex justify-center">
            Which image is more symmetrical?
          </Typography>
          <Box className="flex justify-center gap-32">
            <Image
              src="https://picsum.photos/200"
              alt="first image"
              width={200}
              height={200}
              style={{ width: 200, height: 200 }}
            />
            <Image
              src="https://picsum.photos/200"
              alt="first image"
              width={200}
              height={200}
              style={{ width: 200, height: 200 }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuestionBlock;
