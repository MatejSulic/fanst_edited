import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: Props) => {
  return (
    <Box
      sx={{
        maxWidth: (theme) => theme.breakpoints.values.lg,
        ml: "auto",
        mr: "auto",
        maxHeight: "100vh",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        pb: 4,
      }}
    >
      <Stack
        spacing={4}
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
    </Box>
  );
};

export default ContentWrapper;
