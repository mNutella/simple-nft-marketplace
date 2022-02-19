import React from "react";
import { useEthers } from "@usedapp/core";
import GridList from "@common/components/GridList";
import { useGetItems } from "../api/useGetItems";

export default function Explore() {
  const { account } = useEthers();
  const { data } = useGetItems();

  if (!account) return null;

  return (
    <div className="px-2">
      <GridList items={data} />
    </div>
  );
}
