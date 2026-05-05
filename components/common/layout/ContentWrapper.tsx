import { Box, Container } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: Props) => {
  return (
    <Container
      maxWidth={"lg"}
      sx={{
        // maxHeight: "100vh",
        // height: "100vh",
        backgroundColor: "white",
        // pb: 4,
        // mb: 4,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          p: 1,
          maxHeight: "100%",
          height: "100%",
          // overflowY: "hidden",
          maxWidth: "100%",
          width: "100%",
          alignItems: "center",
        }}
      >
        {children}
      </Stack>
    </Container>
  );
};

export default ContentWrapper;
