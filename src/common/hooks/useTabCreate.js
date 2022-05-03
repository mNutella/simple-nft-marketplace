import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useTabCreate() {
  const { query, replace } = useRouter();
  const { type } = query;
  const defaultIndex = type === "add" ? 1 : 0;
  const [currentTabIndex, setCurrentTabIndex] = useState(defaultIndex);

  useEffect(() => {
    setCurrentTabIndex(defaultIndex);
  }, [type]);

  const handleTabChange = (index) => {
    replace(
      "/create",
      { type: index === 0 ? "create" : "add" },
      { shallow: true }
    );
    setCurrentTabIndex(index);
  };

  const activeTabClassName = (index) =>
    index === currentTabIndex ? "bg-neutral-2" : "bg-neutral-1";

  return {
    defaultIndex,
    currentTabIndex,
    activeTabClassName,
    onTabChange: handleTabChange,
  };
}
