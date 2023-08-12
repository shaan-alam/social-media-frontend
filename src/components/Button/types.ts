import React from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string;
  variant?: "default" | "primary" | "secondary";
  isLoading?: boolean;
}
