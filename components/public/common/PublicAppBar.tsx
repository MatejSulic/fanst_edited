import AdbIcon from "@mui/icons-material/Adb";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

const PublicAppBar = () => {
  return (
    <MuiAppBar position="static">
      <Box
        sx={{
          maxWidth: "100%",
          mx: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <AdbIcon className="flex md:hidden mr-2" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            className="flex md:hidden mr-4 grow"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
        </Toolbar>
      </Box>
    </MuiAppBar>
  );
};

export default PublicAppBar;
