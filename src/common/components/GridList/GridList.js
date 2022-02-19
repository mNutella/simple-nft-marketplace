import { formatEther } from "@ethersproject/units";
import React from "react";
import GridListItem from "./GridListItem";

export default function GridList({ items }) {
  if (!items || !items.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-2">
      {items.map((item) => (
        <GridListItem
          key={item[0].toString()}
          metaInfoHash={item[7]}
          tokenId={item[0].toString()}
          price={parseFloat(formatEther(item[5])).toFixed(4)}
        />
      ))}
    </div>
  );
}
