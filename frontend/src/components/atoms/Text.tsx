"use client";

import React from "react";
import { Typography, TypographyProps } from "@mui/material";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

export type TextProps = Omit<TypographyProps, "variant"> & {
  variant?: TextVariant;
  component?: React.ElementType;
  className?: string;
};

export const Text: React.FC<TextProps> = ({
  children,
  variant = "p",
  component,
  className = "",
  ...props
}) => {
  // Use useId to ensure consistent rendering between server and client
  const id = React.useId();
  const getMuiVariant = (): TypographyProps["variant"] => {
    switch (variant) {
      case "h1":
        return "h1";
      case "h2":
        return "h2";
      case "h3":
        return "h3";
      case "h4":
        return "h4";
      case "h5":
        return "h5";
      case "h6":
        return "h6";
      case "span":
        return "body1";
      case "p":
      default:
        return "body1";
    }
  };

  const getComponent = (): React.ElementType => {
    if (component) return component;

    switch (variant) {
      case "h1":
        return "h1";
      case "h2":
        return "h2";
      case "h3":
        return "h3";
      case "h4":
        return "h4";
      case "h5":
        return "h5";
      case "h6":
        return "h6";
      case "span":
        return "span";
      case "p":
      default:
        return "p";
    }
  };

  const getBaseStyles = () => {
    switch (variant) {
      case "h1":
        return "text-4xl font-bold";
      case "h2":
        return "text-2xl font-semibold";
      case "h3":
        return "text-xl font-semibold";
      case "h4":
        return "text-lg font-medium";
      case "h5":
        return "text-base font-medium";
      case "h6":
        return "text-sm font-medium";
      case "p":
        return "text-base";
      case "span":
        return "text-base";
      default:
        return "";
    }
  };

  // Ensure consistent component rendering by using the same component on server and client
  const muiVariant = getMuiVariant();
  const componentType = getComponent();
  const baseStyles = getBaseStyles();
  
  return (
    <Typography
      key={id}
      variant={muiVariant}
      component={componentType}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </Typography>
  );
};
