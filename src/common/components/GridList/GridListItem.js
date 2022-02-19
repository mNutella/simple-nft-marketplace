import React, { useEffect, useState } from "react";
import Image from "next/image";
import PolygonIcon from "../SVGs/PolygonIcon";
import { getIPFSFileUrl } from "@common/utils/ipfsHelpers";

export default function GridListItem({ metaInfoHash, tokenId, price }) {
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

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition duration-300 ease-in-out hover:scale-105">
      <>
        {thumbnailUrl && (
          <Image
            className="rounded-t-lg"
            src={thumbnailUrl}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            alt={name + " image"}
          />
        )}
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name} #{tokenId}
            </h5>
          </a>
          <div className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg dark:bg-blue-600">
            {price}
            <span className="ml-2 w-3">
              <PolygonIcon />
            </span>
          </div>
        </div>
      </>
    </div>
  );
}
