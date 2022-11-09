import { Button, ButtonProps } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React from "react";

const CreateNewExperimentButton = ({ ...props }: ButtonProps) => {
  return (
    <Button variant={"contained"} startIcon={<CreateIcon />} {...props}>
      Create new experiment
    </Button>
  );
};

export default CreateNewExperimentButton;
