import Link from "next/link";
import LinkButton from "../Button/LinkButton";
import MainIcons from "../SVGs/MainIcons";

const Footer = ({ className }) => {
  return (
    <footer className={className}>
      <div className="container items-center justify-between p-6 mx-auto space-y-6 text-center lg:flex lg:text-left lg:space-y-0">
        <Link href="/">
          <a className="text-3xl font-bold">TW</a>
        </Link>
        <p className="text-md">© Copyright 2022 Trade Wise</p>
        <div className="flex items-center space-x-6 text-left">
          <p>Ready to trade?</p>
          <LinkButton
            href="/explore"
            className="flex items-center px-8 py-3 mx-auto space-x-2 text-black border-2 border-transparent group bg-primary shadow-primary/40 hover:border-primary hover:bg-transparent hover:text-white"
          >
            <span>Explore</span>
            <MainIcons
              icon="long-right-arrow"
              className="w-5 h-5 text-black transition duration-300 group-hover:translate-x-1 group-hover:text-white"
            />
          </LinkButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
