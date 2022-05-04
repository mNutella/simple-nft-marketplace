import Image from "next/image";
import Link from "next/link";
import PolygonIcon from "../SVGs/PolygonIcon";

const HomeFeaturedArtworks = ({ items }) => {
  if (!items) return null;
  if (items?.length > 3) {
    items = items.slice(3);
  }

  return (
    <section className="py-5 lg:py-20">
      <h2 className="text-4xl font-bold text-center lg:text-5xl">
        Featured Artworks
      </h2>

      <div className="flex flex-col mt-10 space-y-6 lg:grid lg:grid-cols-3 lg:gap-x-3 lg:space-y-0">
        {items.map((item) => (
          <Link key={item.id} href={`/nft/${item?.id}`}>
            <a>
              <div className="p-5 space-y-2 transition duration-300 cursor-pointer rounded-xl bg-neutral-1 hover:scale-101 hover:bg-neutral-2 lg:max-w-lg">
                <div className="relative w-full h-full">
                  <Image
                    className="rounded-xl"
                    layout="responsive"
                    height={326}
                    width={326}
                    objectFit="cover"
                    objectPosition="center"
                    alt="The top NFT image"
                    src={item?.image}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium">{item?.name}</p>
                  <div className="flex items-center space-x-2">
                    <PolygonIcon className="w-5 h-5 text-secondary" />
                    <p className="text-md">{item?.price}</p>
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

export default HomeFeaturedArtworks;
