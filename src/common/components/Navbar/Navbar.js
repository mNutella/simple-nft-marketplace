import Link from "next/link";
import MetaMaskAuthForm from "@modules/metamask-auth/components/MetaMaskAuthForm";
import WalletInfo from "@modules/wallet/components/WalletInfo";

const Navbar = ({ className }) => {
  return (
    <nav className="sticky top-0 z-10 bg-black lg:h-[100px]">
      <div className="container flex items-center justify-between px-4 py-6 mx-auto lg:py-6">
        <Link href="/">
          <a className="text-3xl font-bold">Trade Wise</a>
        </Link>
        <ul className="hidden text-lg font-medium text-white lg:flex lg:space-x-6">
          <li className="hover:text-primary">
            <Link href="/explore">
              <a>Explore</a>
            </Link>
          </li>
          <li className="hover:text-primary">
            <Link href="/create">
              <a>Create</a>
            </Link>
          </li>
        </ul>
        <div className="lg:w-[264px]">
          <MetaMaskAuthForm />
          <WalletInfo className="mb-4" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
