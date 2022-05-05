import { cropAddress } from "@common/utils/strings";
import { getExplorerAddressLink, Mumbai } from "@usedapp/core";
import Image from "next/image";
import Link from "next/link";
import PolygonIcon from "../SVGs/PolygonIcon";

const HomeTopTraders = ({ items }) => {
  if (!items) return null;
  if (items?.length > 9) {
    items = items.slice(9);
  }

  return (
    <section className="py-5 lg:py-20">
      <h2 className="text-center text-4xl font-bold lg:text-5xl">
        Top Traders This Week
      </h2>

      <div className="mt-10 flex flex-col space-y-4 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
        {items.map((item) => (
          <Link
            key={item?.id}
            href={getExplorerAddressLink(item?.address, Mumbai.chainId)}
          >
            <a>
              <div
                key={item.key}
                className="flex space-x-4 overflow-hidden rounded-xl bg-neutral-1 p-5 transition duration-150 hover:scale-101 hover:bg-neutral-2"
              >
                <div className="relative h-[65px] w-[65px]">
                  <Image
                    className="rounded-xl"
                    layout="responsive"
                    height={65}
                    width={65}
                    objectFit="cover"
                    objectPosition="center"
                    alt="The top NFT image"
                    src={item?.image}
                  />
                </div>
                <div className="space-y-2">
                  <p className="break-words text-lg font-medium line-clamp-1">
                    {cropAddress(item?.address, 10, 5)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <PolygonIcon className="h-5 w-5 text-secondary" />
                    <p className="text-md">{item?.budget}</p>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeTopTraders;
