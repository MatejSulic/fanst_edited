import { Stack } from "@mui/system";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: Props) => {
  return (
    <div className="max-w-7xl mx-auto max-h-screen h-screen">
      <Stack
        spacing={4}
        sx={{ p: 1, maxHeight: "100%", height: "100%", overflowY: "hidden" }}
      >
        {children}
      </Stack>
    </div>
  );
};

export default ContentWrapper;
