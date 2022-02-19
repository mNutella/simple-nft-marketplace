import React from "react";
import GridListItem from "./GridListItem";

export default function GridList({ currentAddress, items, onBuy }) {
  if (!items || !items.length)
    return (
      <h1 className="text-2xl mb-2 dark:text-gray-600 font-light text-center">
        Empty List
      </h1>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-2">
      {items.map((item) => (
        <GridListItem
          key={item[0].toString()}
          currentAddress={currentAddress}
          sellerAddress={item[3]}
          contractAddress={item[1]}
          metaInfoHash={item[7]}
          itemId={item[0]}
          tokenId={item[2]}
          price={item[5]}
          onBuy={onBuy}
        />
      ))}
    </div>
  );
}
