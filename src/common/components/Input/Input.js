import React from "react";
import FileInput from "./FileInput";

const Input = React.forwardRef(
  ({ id, label, type, value, helper, error, ...rest }, ref) => {
    const className = `bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 ${
      error
        ? "border-red-500 placeholder-red-500"
        : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400"
    } block w-full dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;

    return (
      <div className="mb-6">
        {label && (
          <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        {type === "file" ? (
          <FileInput
            className={`${className} cursor-pointer dark:text-gray-400`}
            id={id}
            ref={ref}
            type={type}
            {...rest}
          />
        ) : (
          <input
            className={`${className} p-2.5`}
            id={id}
            ref={ref}
            type={type}
            value={value}
            {...rest}
          />
        )}
        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error?.type === "required" && error.message}
            {error?.type === "min" && error.message}
          </p>
        )}
        {helper && !error && (
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            {helper}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
