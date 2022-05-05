import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatEther } from "@ethersproject/units";
import PolygonIcon from "@common/components/SVGs/PolygonIcon";
import { getIPFSFileUrl } from "@common/utils/ipfsHelpers";

export default function GridListItem({
  metaInfoHash,
  itemId,
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
        const data = await (await fetch(getIPFSFileUrl(metaInfoHash))).json();
        setName(data?.name);
        setThumbnailUrl(getIPFSFileUrl(data?.thumbnail ?? data["image_url"]));
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
    <Link href={`/nft/${itemId}`}>
      <a>
        <div className="p-5 space-y-2 transition duration-300 cursor-pointer rounded-xl bg-neutral-1 hover:scale-101 hover:bg-neutral-2 lg:max-w-lg">
          <div className="relative w-full h-full">
            {thumbnailUrl && (
              <Image
                className="rounded-xl"
                layout="responsive"
                height={326}
                width={326}
                objectFit="cover"
                objectPosition="center"
                alt={name + " image"}
                src={thumbnailUrl}
              />
            )}
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium truncate">
              {name} #{itemId.toString()}
            </p>
            <div className="flex items-center space-x-2">
              <PolygonIcon className="w-5 h-5 text-secondary" />
              <p className="text-md">{formatEther(price)}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
