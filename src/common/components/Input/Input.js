import React from "react";

const Input = React.forwardRef(({ id, label, error, ...rest }, ref) => {
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
      <input
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 ${
          error
            ? "border-red-500 placeholder-red-500"
            : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400"
        } block w-full p-2.5 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        id={id}
        ref={ref}
        {...rest}
      />
      {error && (
        <p className="text-sm text-red-500">
          {error?.type === "required" && error.message}
          {error?.type === "min" && error.message}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
