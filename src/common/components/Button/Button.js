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
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={
        `rounded-lg text-center text-sm font-medium shadow-md transition duration-150 focus:outline-none ${
          disabled ? "cursor-not-allowed" : ""
        }` + className
      }
      {...rest}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex items-center">
          <Spinner />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
