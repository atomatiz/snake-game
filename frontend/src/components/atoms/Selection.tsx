"use client";

import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  SelectProps as MuiSelectProps,
  FormHelperText,
} from "@mui/material";
import { cn } from "@/common/utils/tailwind.util";

export type SelectionProps = Omit<MuiSelectProps, "variant"> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  className?: string;
  options: Array<{
    value: string | number;
    label: string;
  }>;
};

export const Selection: React.FC<SelectionProps> = ({
  label,
  helperText,
  error,
  options,
  id,
  className,
  ...props
}) => {
  const labelId = id ? `${id}-label` : "select-label";

  return (
    <FormControl error={error} size="small" className={cn(className)}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        labelId={labelId}
        id={id}
        label={label}
        className={cn("border rounded p-2")}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
