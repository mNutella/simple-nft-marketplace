import React from "react";
import Image from "next/image";
import LinkButton from "../Button/LinkButton";

const HomeFAQ = ({ items }) => {
  if (!items) return null;
  if (items?.length > 3) {
    items = items.slice(3);
  }

  return (
    <section className="py-5 space-y-10 lg:space-y-10 lg:py-10">
      <h2 className="text-4xl font-bold text-center lg:text-5xl">
        Create and sell your NFTs
      </h2>

      <div className="flex flex-col items-center space-y-6 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-10">
        {items.map((item) => (
          <div
            key={item.title}
            className="max-w-lg p-5 space-y-2 overflow-hidden text-center lg:p-10 rounded-xl bg-neutral-1"
          >
            <div className="relative mx-auto max-w-[200px] lg:max-w-full">
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
            <h6 className="text-xl font-semibold lg:text-2xl">{item.title}</h6>
            <p className="text-lg lg:text-xl text-neutral-3">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center space-y-6 lg:flex-row lg:space-y-0 lg:space-x-12">
        <LinkButton
          href="/create"
          className="px-10 py-3 border-2 border-primary shadow-primary/40 hover:bg-primary hover:text-black"
        >
          Create
        </LinkButton>
        <LinkButton
          href="/create?add"
          className="px-12 py-3 border-2 border-secondary shadow-secondary/40 hover:bg-secondary"
        >
          Sell
        </LinkButton>
      </div>
    </section>
  );
};

export default HomeFAQ;
