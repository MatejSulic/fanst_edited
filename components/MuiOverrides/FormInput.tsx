import { TextField } from "@mui/material";
import React from "react";
import { Controller, Control } from "react-hook-form";

type Props = {
  name: string;
  control: Control;
  label: string;
};

const FormInput = ({ name, control, label }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField onChange={onChange} value={value} label={label} />
      )}
    />
  );
};

export default FormInput;
