import React from "react";
import Spinner from "../SVGs/Spinner";

export default function Button({
  type = "button",
  appendClassName,
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
        `rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:text-white dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800 ${
          disabled ? "cursor-not-allowed" : ""
        }` + appendClassName
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
