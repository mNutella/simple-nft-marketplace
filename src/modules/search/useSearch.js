import { useState } from "react";

export function useSearch() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return {
    value,
    onChange: handleChange
  }
}
