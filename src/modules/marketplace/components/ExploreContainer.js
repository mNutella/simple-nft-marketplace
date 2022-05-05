import React from "react";
import GridList from "@common/components/GridList";
import { useSearch } from "@modules/search/useSearch";

export default function ExploreContainer({ data, address }) {
  // const { value, onChange } = useSearch();

  return (
    <section className="flex flex-col justify-center">
      {/* <input
        className="w-full rounded-md bg-neutral-1 p-3 text-white placeholder:text-neutral-3 lg:w-auto lg:min-w-[400px]"
        placeholder="Enter your email address"
        type="search"
        value={value}
        onChange={onChange}
      /> */}
      <GridList items={data} currentAddress={address} />
    </section>
  );
}
