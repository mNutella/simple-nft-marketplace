import React from "react";
import Spinner from "../SVGs/Spinner";

export default function Button({
  text,
  icon: Icon,
  type = "button",
  loading,
  disabled,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
      onClick={onClick}
    >
      {loading ? (
        <>
          <Spinner />
          Loading...
        </>
      ) : (
        <>
          {Icon}
          {text}
        </>
      )}
    </button>
  );
}
