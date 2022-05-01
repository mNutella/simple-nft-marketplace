import { cropAddress } from "@common/utils/strings";
import Image from "next/image";
import Link from "next/link";
import PolygonIcon from "../SVGs/PolygonIcon";

const HomeTopTraders = ({ items }) => {
  if (!items) return null;
  if (items?.length > 9) {
    items = items.slice(9);
  }

  return (
    <section className="py-5 lg:py-10">
      <h2 className="text-5xl font-bold text-center">Top Traders This Week</h2>

      <div className="flex flex-col mt-10 space-y-4 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
        {items.map((item) => (
          <Link key={item.id} href={`/nft/${item?.id}`}>
            <a>
              <div
                key={item.key}
                className="flex p-5 space-x-4 overflow-hidden transition duration-150 rounded-xl bg-neutral-1 hover:bg-neutral-2 hover:scale-101"
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
                  <p className="text-lg font-medium break-words line-clamp-1">
                    {cropAddress(item?.address, 10, 5)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <PolygonIcon className="w-5 h-5 text-secondary" />
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
