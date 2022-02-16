import React from "react";

export default function FileInput({ onChosen }) {
  const fileLoaded = (reader) => {
    onChosen && onChosen(reader.result);
  };

  const handleFileChange = async (event) => {
    event.preventDefault();

    if (event.target.files.length == 0) return;
    const file = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => fileLoaded(reader);
  };

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        htmlFor="user_avatar"
      >
        Create new item
      </label>
      <input
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="user_avatar_help"
        id="user_avatar"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="user_avatar_help"
      >
        File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB
      </div>
    </div>
  );
}
