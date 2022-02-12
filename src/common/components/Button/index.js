import React from "react";

export default function Button({ text, disabled, onClick }) {
  return (
    <button
      className={`mx-2 my-2  transition duration-150 ease-in-out rounded px-6 py-2 text-gray-800 text-sm ${
        disabled ? "bg-gray-600" : "bg-gray-300 hover:bg-gray-200"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
