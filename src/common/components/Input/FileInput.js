import React from "react";

const FileInput = React.forwardRef(({ onChange, ...rest }, ref) => {
  const fileLoaded = (reader, fileData) => {
    onChange && onChange({ reader, fileData });
  };

  const handleFileChange = async (event) => {
    event.preventDefault();

    if (event.target.files.length == 0) return;

    // TODO: add support for multiple files
    const file = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => fileLoaded(reader, file);
  };

  return (
    <div>
      <input ref={ref} {...rest} onChange={handleFileChange} />
    </div>
  );
});

FileInput.displayName = "FileInput";

export default FileInput;
