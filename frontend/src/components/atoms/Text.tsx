import React from "react";

interface TextProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "p" | "span";
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "p",
  className = "",
}) => {
  const Tag =
    variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "span"
      ? "span"
      : "p";
  const baseStyles = {
    h1: "text-4xl font-bold",
    h2: "text-2xl font-semibold",
    p: "text-base",
    span: "text-base",
  };

  return (
    <Tag className={`${baseStyles[variant]} ${className}`}>{children}</Tag>
  );
};
