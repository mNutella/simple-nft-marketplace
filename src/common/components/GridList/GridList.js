import React from "react";
import GridListItem from "./GridListItem";

export default function GridList({ currentAddress, items, onBuy }) {
  if (!items || !items.length)
    return (
      <h1 className="mb-2 text-2xl font-light text-center dark:text-gray-600">
        Empty List
      </h1>
    );

  return (
    <div className="grid grid-cols-1 gap-4 mt-5 mb-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 lg:mt-10">
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
