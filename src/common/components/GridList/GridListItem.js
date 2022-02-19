import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatEther } from "@ethersproject/units";
import PolygonIcon from "@common/components/SVGs/PolygonIcon";
import Button from "@common/components/Button";
import { getIPFSFileUrl } from "@common/utils/ipfsHelpers";
import { isSameAccount } from "@common/utils/etherHelpers";

export default function GridListItem({
  metaInfoHash,
  currentAddress,
  sellerAddress,
  itemId,
  tokenId,
  price,
  contractAddress,
  onBuy,
}) {
  const [name, setName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const data = await (await fetch(metaInfoHash)).json();
        setName(data?.name);
        setThumbnailUrl(getIPFSFileUrl(data?.thumbnail));
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    })();
  }, [metaInfoHash]);

  if (loading || error) return null;

  const handleBuyClick = () => {
    onBuy && onBuy({ contractAddress, itemId, price });
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900 group transition duration-300 ease-in-out hover:scale-105">
      <>
        {thumbnailUrl && (
          <Image
            className="rounded-t-lg"
            src={thumbnailUrl}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="cover"
            alt={name + " image"}
          />
        )}
        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name} #{itemId.toString()}
          </h5>
          <div className="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white bg-gray-300 rounded-lg dark:bg-gray-700 transition duration-300 group-hover:bg-gray-800 mb-2">
            {formatEther(price)}
            <span className="ml-2 w-4">
              <PolygonIcon className="fill-blue-400" />
            </span>
          </div>
          {!isSameAccount(currentAddress, sellerAddress) && (
            <div className="w-full">
              <Button className="w-full text-center" onClick={handleBuyClick}>
                <span className="w-full">Buy</span>
              </Button>
            </div>
          )}
        </div>
      </>
    </div>
  );
}
