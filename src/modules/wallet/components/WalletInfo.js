import Link from "next/link";
import Image from "next/image";
import Address from "./Address";
import Balance from "./Balance";
import { Popover } from "@headlessui/react";

export default function WalletInfo({
  account,
  balance,
  className,
  onDeactivate,
}) {
  return (
    <div className={`flex items-center justify-end lg:space-x-6 ${className}`}>
      <div className="flex items-center px-2 py-1 space-x-3 rounded-full bg-neutral-2">
        <Image
          className="rounded-full"
          layout="fixed"
          width={32}
          height={32}
          objectFit="cover"
          objectPosition="center"
          alt="The top NFT image"
          src={"/images/nft-1.jpg"}
        />
        <Popover className="relative">
          <Popover.Button className="h-full px-4 py-3 rounded-full cursor-pointer hover:bg-neutral-1">
            <svg
              className="transition"
              width="24"
              height="14"
              viewBox="0 0 24 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className=""
                d="M12 1C12 0.447715 12.4477 0 13 0H23C23.5523 0 24 0.447715 24 1C24 1.55228 23.5523 2 23 2H13C12.4477 2 12 1.55228 12 1Z"
                fill="#F0F0F0"
              />
              <path
                d="M0 13C0 12.4477 0.447715 12 1 12H11C11.5523 12 12 12.4477 12 13C12 13.5523 11.5523 14 11 14H1C0.447715 14 0 13.5523 0 13Z"
                fill="#F0F0F0"
              />
              <path
                d="M0 7C0 6.44772 0.447715 6 1 6H23C23.5523 6 24 6.44772 24 7C24 7.55228 23.5523 8 23 8H1C0.447716 8 0 7.55228 0 7Z"
                fill="#F0F0F0"
              />
            </svg>
          </Popover.Button>

          <Popover.Panel className="absolute z-10 mt-3 overflow-hidden transform -right-1 rounded-xl bg-neutral-2 xl:left-1 xl:w-screen xl:max-w-fit xl:-translate-x-1/2">
            <div className="flex flex-col w-full whitespace-nowrap">
              <div className="w-full pt-3 text-center border-b-2 border-neutral-1 lg:px-10">
                <Address address={account} />
                <Balance balance={balance} />
              </div>
              <Link href="/create">
                <a className="w-full p-3 cursor-pointer hover:bg-neutral-1 lg:px-10">
                  Create NFT
                </a>
              </Link>
              <Link href="/create?type=add">
                <a className="w-full p-3 cursor-pointer hover:bg-neutral-1 lg:px-10">
                  Add NFT
                </a>
              </Link>
              <Link href="/explore">
                <a className="block w-full p-3 cursor-pointer lg:hidden hover:bg-neutral-1 lg:px-10">
                  Explore
                </a>
              </Link>
              <div
                className="w-full p-3 cursor-pointer hover:bg-neutral-1 lg:px-10"
                onClick={onDeactivate}
              >
                Log Out
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
}
