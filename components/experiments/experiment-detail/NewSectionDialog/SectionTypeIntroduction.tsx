import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import TextTruncate from "react-text-truncate";
import SectionTypeCard, { SectionTypeCardSharedProps } from "./SectionTypeCard";

const SectionTypeIntroduction = ({ ...props }: SectionTypeCardSharedProps) => {
  return (
    <SectionTypeCard
      title="Introduction"
      subheader="Predefined section including introduction in a plain text format"
      {...props}
    >
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          <TextTruncate
            line={5}
            element="span"
            text={
              "Welcome to the experiment! You will see a series of questions, one may be with a different assignment. Please, answer the questions honestly and as fast as possible."
            }
          />
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="contained" size="small" component="div">
            Start experiment
          </Button>
        </Box>
      </Stack>
    </SectionTypeCard>
  );
};

export default SectionTypeIntroduction;
