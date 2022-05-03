import Image from "next/image";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import PolygonIcon from "../SVGs/PolygonIcon";
import Button from "../Button";

import "react-medium-image-zoom/dist/styles.css";
import { getExplorerAddressLink, Polygon } from "@usedapp/core";

const NFTHeader = ({ nftData, onBuy }) => {
  return (
    <section className="flex flex-col h-full py-5 lg:flex-row lg:space-y-0 lg:py-10">
      <div className="flex items-center justify-center order-2 mt-6 lg:order-1 lg:mt-0 lg:basis-1/2">
        <div className="w-full space-y-6 lg:max-w-md lg:space-y-12">
          <div className="flex flex-col">
            <p className="whitespace-nowrap">Owned by</p>
            <Link
              href={getExplorerAddressLink(
                nftData?.ownerAddress,
                Polygon.chainId
              )}
            >
              <a
                target="_blank"
                className="w-full underline truncate cursor-pointer text-secondary hover:text-primary"
              >
                {nftData?.ownerAddress}
              </a>
            </Link>
          </div>
          <h1 className="text-2xl font-bold lg:text-3xl">M2 Mutant Serum</h1>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <PolygonIcon className="w-5 h-5 text-secondary lg:h-7 lg:w-7" />
              <p className="text-xl lg:text-2xl">{nftData.price}</p>
            </div>
          </div>
          <p className="text-lg text-neutral-4">
            Trade Wise is the community-first NFT marketplace with rewards for
            participating. Buy NFTs (or sell &apos;em) to earn rewards. Explore
            the market to get started.
          </p>
          <Button
            className="w-full px-8 py-3 text-white transition duration-150 border-2 border-transparent bg-secondary shadow-secondary/40 hover:border-secondary hover:bg-transparent lg:w-auto"
            onClick={onBuy}
          >
            Buy
          </Button>
        </div>
      </div>
      <div className="order-1 lg:order-2 lg:basis-1/2 lg:p-10">
        <div className="p-5 space-y-2 rounded-xl bg-neutral-1 lg:max-w-lg">
          <Zoom wrapStyle={{ minWidth: "100%", display: 'flex' }} overlayBgColorEnd="#0a0a0a">
            <div className="relative min-w-full ">
              <Image
                className="rounded-xl"
                layout="responsive"
                width={400}
                height={400}
                objectFit="cover"
                objectPosition="center"
                alt="The top NFT image"
                src={nftData?.image}
              />
            </div>
          </Zoom>
        </div>
      </div>
    </section>
  );
};

export default NFTHeader;
