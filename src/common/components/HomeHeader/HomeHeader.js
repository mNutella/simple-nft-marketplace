import Link from "next/link";
import Image from "next/image";
import MainIcons from "@common/components/SVGs/MainIcons";
import PolygonIcon from "../SVGs/PolygonIcon";
import LinkButton from "../Button/LinkButton";

const HomeHeader = ({ nftData }) => {
  return (
    <section className="py-5 space-y-6 lg:flex lg:space-y-0 lg:py-10">
      <div className="flex items-center justify-center lg:basis-1/2">
        <div className="space-y-6 lg:max-w-md lg:space-y-12">
          <h1 className="text-6xl font-bold lg:text-7xl">
            Trade NFTs, Get Rewards
          </h1>
          <p className="text-lg text-neutral-4">
            Trade Wise is the community-first NFT marketplace with rewards for
            participating. Buy NFTs (or sell &apos;em) to earn rewards. Explore
            the market to get started.
          </p>
          <div className="w-full space-y-6 lg:flex lg:space-y-0 lg:space-x-12">
            <LinkButton
              href="/explore"
              className="flex items-center justify-center px-8 py-3 space-x-2 border-2 border-transparent group bg-secondary shadow-secondary/40 hover:border-secondary hover:bg-transparent"
            >
              <span>Explore</span>
              <MainIcons
                icon="long-right-arrow"
                className="w-5 h-5 transition duration-300 group-hover:translate-x-1"
              />
            </LinkButton>
            <LinkButton
              href="/create?type=add"
              className="flex items-center justify-center py-3 border-2 border-primary px-14 shadow-primary/40 hover:bg-primary hover:text-black"
            >
              Sell
            </LinkButton>
          </div>
        </div>
      </div>
      <div className="lg:basis-1/2 lg:p-10">
        <Link href={`/nft/${nftData?.id}`}>
          <a>
            <div className="p-5 space-y-2 transition duration-150 cursor-pointer rounded-xl bg-neutral-1 hover:bg-neutral-2 lg:max-w-lg">
              <div className="">
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
              <div className="space-y-2">
                <p className="text-lg font-medium">{nftData.name}</p>
                <div className="flex items-center space-x-2">
                  <PolygonIcon className="w-5 h-5 text-secondary" />
                  <p className="text-md">{nftData.price}</p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default HomeHeader;
