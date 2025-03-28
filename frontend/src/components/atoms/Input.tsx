"use client";

import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type InputProps = TextFieldProps & {
  className?: string;
};

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      className={className}
      InputProps={{
        className: "border rounded",
        ...props.InputProps,
      }}
      {...props}
    />
  );
};
