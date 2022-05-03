import React from "react";
import Spinner from "../SVGs/Spinner";

export default function Button({
  type = "button",
  className,
  loading,
  disabled,
  children,
  onClick,
  ...rest
}) {
  disabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={disabled}
      className={
        `rounded-lg text-center font-medium shadow-md transition duration-150 focus:outline-none ${
          disabled ? "cursor-not-allowed " : ""
        }` + className
      }
      {...rest}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
          <span className="animate-pulse">Loading</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
