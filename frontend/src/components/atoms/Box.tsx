import React from "react";

type ElementType = keyof React.JSX.IntrinsicElements;

interface BoxProps<T extends ElementType> {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export const Box = <T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...rest
}: BoxProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BoxProps<T>>) => {
  const Component = (as ?? "div") as React.ElementType;
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};
