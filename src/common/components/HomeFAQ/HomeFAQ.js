import React from "react";
import Image from "next/image";
import LinkButton from "../Button/LinkButton";

const HomeFAQ = ({ items }) => {
  if (!items) return null;
  if (items?.length > 3) {
    items = items.slice(3);
  }

  return (
    <section className="py-5 space-y-10 lg:space-y-10 lg:py-20">
      <h2 className="text-4xl font-bold text-center lg:text-5xl">
        Create and sell your NFTs
      </h2>

      <div className="flex flex-col items-center space-y-6 lg:grid lg:grid-cols-3 lg:gap-x-10 lg:space-y-0">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col max-w-lg p-5 space-y-6 overflow-hidden text-center rounded-xl bg-neutral-1 lg:justify-between lg:p-10 lg:h-full"
          >
            <div className="space-y-2">
              <div className="relative mx-auto w-full max-w-[200px]">
                <Image
                  className="rounded-xl"
                  layout="responsive"
                  height={240}
                  width={240}
                  objectFit="cover"
                  objectPosition="center"
                  alt="The top NFT image"
                  src={item?.image}
                />
              </div>
              <h6 className="text-xl font-semibold lg:text-2xl">
                {item.title}
              </h6>
              <p className="text-lg text-neutral-3 lg:text-xl">
                {item.description}
              </p>
            </div>
            <LinkButton
              href={item?.link}
              className="w-full px-10 py-3 border-2 border-primary shadow-primary/40 hover:bg-primary hover:text-black"
            >
              {item?.linkText}
            </LinkButton>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeFAQ;
