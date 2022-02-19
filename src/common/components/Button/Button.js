import React from "react";
import Spinner from "../SVGs/Spinner";

export default function Button({
  type = "button",
  className,
  loading,
  disabled,
  children,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={
        "font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 bg-gradient-to-r text-white dark:text-white from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 " +
        className
      }
      onClick={onClick}
    >
      {loading ? (
        <>
          <Spinner />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
