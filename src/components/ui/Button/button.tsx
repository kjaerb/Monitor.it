import { NextComponentType } from "next";
import clsx from "clsx";
import { forwardRef } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  variant?: keyof typeof buttonColors;
  onClick?: () => void;
}

const buttonColors = {
  primary: "bg-blue-500 hover:bg-blue-700 text-white",
  secondary: "bg-gray-500 hover:bg-gray-700 text-white",
  transparent:
    "bg-transparent border-none shadow-none hover:shadow-md hover:border text-gray-700",
  danger: "bg-red-500 hover:bg-red-700 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-700 text-white",
  success: "bg-green-500 hover:bg-green-700 text-white",
  info: "bg-blue-500 hover:bg-blue-700 text-white",
  light: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  dark: "bg-gray-800 hover:bg-gray-900 text-white",
  disabled: "bg-gray-300 text-gray-800 cursor-not-allowed",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", isLoading, onClick }: ButtonProps) => {
    return (
      <button
        disabled={isLoading}
        onClick={onClick}
        className={clsx([
          "shadow-md rounded-md border px-4 py-2 mx-2",
          buttonColors[variant],
          isLoading && buttonColors["disabled"],
        ])}>
        {children}
      </button>
    );
  }
);

export default Button;
