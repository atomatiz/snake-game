"use client";

import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { cn } from "@/common/utils/tailwind.util";

type InputProps = TextFieldProps & {
  className?: string;
};

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      className={cn(className)}
      InputProps={{
        className: cn("border rounded", props.InputProps?.className),
        ...props.InputProps,
      }}
      {...props}
    />
  );
};
