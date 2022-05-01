import React from "react";
import LinkButton from "../Button/LinkButton";
import MainIcons from "../SVGs/MainIcons";

const DiscordCTA = () => {
  return (
    <section className="w-full py-10 lg:py-20">
      <div className="px-5 py-10 mx-auto space-y-6 text-center lg:max-w-4xl rounded-xl bg-neutral-2 lg:py-20">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold lg:text-4xl">Join our community</h3>
          <p className="text-md lg:text-lg text-neutral-4">
            Meet the Trade Wise team, traders and artists for platform updates,
            announcements, and more...
          </p>
        </div>
        <div className="flex justify-center">
          <LinkButton
            href="discord://discordapp.com"
            className="flex items-center px-8 py-3 mx-auto space-x-2 border-2 border-transparent group bg-secondary shadow-secondary/40 hover:border-secondary hover:bg-transparent"
          >
            <span>Launch Discord</span>
            <MainIcons
              icon="discord"
              className="w-5 h-5 text-white transition duration-300 group-hover:scale-105"
            />
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default DiscordCTA;
