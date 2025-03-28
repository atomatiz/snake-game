"use client";

import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning";

export type ButtonProps = Omit<MuiButtonProps, "variant"> & {
  variant?: ButtonVariant;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const getMuiProps = () => {
    switch (variant) {
      case "primary":
        return { variant: "contained", color: "primary" };
      case "secondary":
        return { variant: "contained", color: "secondary" };
      case "danger":
        return { variant: "contained", color: "error" };
      case "success":
        return { variant: "contained", color: "success" };
      case "warning":
        return { variant: "contained", color: "warning" };
      default:
        return { variant: "contained", color: "primary" };
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 text-white hover:bg-blue-600";
      case "secondary":
        return "bg-gray-500 text-white hover:bg-gray-600";
      case "danger":
        return "bg-red-500 text-white hover:bg-red-600";
      case "success":
        return "bg-green-500 text-white hover:bg-green-600";
      case "warning":
        return "bg-yellow-500 text-white hover:bg-yellow-600";
      default:
        return "bg-blue-500 text-white hover:bg-blue-600";
    }
  };

  const muiProps = getMuiProps();
  const variantClasses = getVariantClasses();

  return (
    <MuiButton
      onClick={onClick}
      variant={muiProps.variant as "contained"}
      color={
        muiProps.color as
          | "primary"
          | "secondary"
          | "error"
          | "success"
          | "warning"
      }
      className={`px-4 py-2 rounded focus:outline-none ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
