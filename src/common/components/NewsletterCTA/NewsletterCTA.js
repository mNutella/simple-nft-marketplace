import React from "react";
import Button from "../Button";

const NewsletterCTA = () => {
  return (
    <section className="w-full py-10 lg:py-20">
      <div className="px-5 py-10 mx-auto space-y-6 text-center lg:max-w-4xl rounded-xl bg-neutral-2 lg:py-20">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold lg:text-4xl">Never miss opportunity!</h3>
          <p className="text-md lg:text-lg text-neutral-4">
            Subscribe to our super-exclusive trade list and be the first to know
            about new NFTs
          </p>
        </div>
        <form className="items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6 lg:flex">
          <input
            className="w-full lg:w-auto lg:min-w-[400px] p-3 rounded-md bg-neutral-1 text-white placeholder:text-neutral-3"
            placeholder="Enter your email address"
            type="email"
          />
          <Button className="w-full px-8 py-3 text-white transition duration-150 border-2 border-transparent lg:w-auto bg-secondary shadow-secondary/40 hover:border-secondary hover:bg-transparent">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterCTA;
