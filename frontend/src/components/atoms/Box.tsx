"use client";

import React from "react";
import { Box as MuiBox, BoxProps as MuiBoxProps } from "@mui/material";
import { cn } from "@/common/utils/tailwind.util";

type ElementType = keyof React.JSX.IntrinsicElements;

export type BoxProps = MuiBoxProps & {
  as?: ElementType;
  className?: string;
};

export const Box: React.FC<BoxProps> = ({
  as,
  children,
  className,
  ...rest
}) => {
  const componentProp = as ? { component: as as React.ElementType } : {};

  return (
    <MuiBox {...componentProp} className={cn(className)} {...rest}>
      {children}
    </MuiBox>
  );
};
