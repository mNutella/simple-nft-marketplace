import Image from "next/image";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import { getExplorerAddressLink, Mumbai } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { isSameAccount } from "@common/utils/etherHelpers";
import PolygonIcon from "../SVGs/PolygonIcon";
import Button from "../Button";
import Spinner from "../SVGs/Spinner";

import "react-medium-image-zoom/dist/styles.css";

const NFTHeader = ({ nftData, currentAddress, onBuy }) => {
  if (!nftData)
    return (
      <div className="flex flex-col items-center justify-center space-y-2">
        <Spinner className="h-10 w-10" />
      </div>
    );

  return (
    <section className="flex h-full flex-col py-5 lg:flex-row lg:space-y-0 lg:py-10">
      <div className="order-2 mt-6 flex items-center justify-center lg:order-1 lg:mt-0 lg:basis-1/2">
        <div className="w-full space-y-6 lg:max-w-md lg:space-y-12">
          <div className="flex flex-col">
            <p className="whitespace-nowrap">Owned by</p>
            <Link
              href={getExplorerAddressLink(
                nftData?.sellerAddress,
                Mumbai.chainId
              )}
            >
              <a
                target="_blank"
                className="w-full cursor-pointer truncate text-secondary underline hover:text-primary"
              >
                {nftData?.sellerAddress}
              </a>
            </Link>
          </div>
          <h1 className="text-2xl font-bold lg:text-3xl">M2 Mutant Serum</h1>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <PolygonIcon className="h-5 w-5 text-secondary lg:h-7 lg:w-7" />
              <p className="text-xl lg:text-2xl">
                {nftData?.price && formatEther(nftData.price)}
              </p>
            </div>
          </div>
          <p className="text-lg text-neutral-4">{nftData?.description}</p>
          {currentAddress &&
            !isSameAccount(currentAddress, nftData?.sellerAddress) && (
              <Button
                className="w-full border-2 border-transparent bg-secondary px-8 py-3 text-white shadow-secondary/40 transition duration-150 hover:border-secondary hover:bg-transparent lg:w-auto"
                onClick={onBuy}
              >
                Buy
              </Button>
            )}
        </div>
      </div>
      <div className="order-1 lg:order-2 lg:basis-1/2 lg:p-10">
        <div className="space-y-2 rounded-xl bg-neutral-1 p-5 lg:max-w-lg">
          <Zoom
            wrapStyle={{ minWidth: "100%", display: "flex" }}
            overlayBgColorEnd="#0a0a0a"
          >
            <div className="relative min-w-full ">
              {nftData?.image && (
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
              )}
            </div>
          </Zoom>
        </div>
      </div>
    </section>
  );
};

export default NFTHeader;
