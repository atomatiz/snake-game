"use client";

import React from "react";
import {
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  AlertTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { cn } from "@/common/utils/tailwind.util";

export type AlertProps = MuiAlertProps & {
  title?: string;
  onClose?: () => void;
  className?: string;
};

export const Alert: React.FC<AlertProps> = ({
  title,
  children,
  onClose,
  className,
  ...props
}) => {
  return (
    <MuiAlert
      className={cn("rounded border", className)}
      {...props}
      action={
        onClose ? (
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ) : undefined
      }
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  );
};
