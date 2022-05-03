import React from "react";
import FileInput from "./FileInput";

const Input = React.forwardRef(
  ({ id, label, type, value, helper, error, ...rest }, ref) => {
    const className = `bg-neutral-2 text-white border rounded-lg focus:ring-blue-500 block w-full focus:ring-blue-500 focus:border-blue-500 ${
      error
        ? "border-red-500 placeholder-red-500"
        : "border-primary focus:border-blue-500 placeholder-neutral-3"
    }`;

    return (
      <div>
        {label && (
          <label htmlFor={id} className="block mb-2 font-medium text-white">
            {label}
          </label>
        )}
        {type === "file" ? (
          <FileInput
            className={`${className} cursor-pointer text-neutral-3 file:cursor-pointer file:rounded-l-lg file:rounded-r-none file:border-none file:bg-neutral-1 file:p-3 file:text-neutral-4`}
            id={id}
            ref={ref}
            type={type}
            {...rest}
          />
        ) : (
          <input
            className={`p-3 ${className}`}
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
