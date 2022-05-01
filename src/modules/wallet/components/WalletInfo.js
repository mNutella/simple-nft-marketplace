import React, { useState } from "react";
import Image from "next/image";
import { useEtherBalance, useEthers } from "@usedapp/core";
import Address from "./Address";
import Balance from "./Balance";
import Modal from "@modules/modal/components/Modal";
import useModal from "@modules/modal/api/useModal";
import CreateNFTForm from "@modules/marketplace/components/CreateNFTForm";
import AddNFTForm from "@modules/marketplace/components/AddNFTForm";
import { Popover } from "@headlessui/react";
import Link from "next/link";

export default function WalletInfo({ className }) {
  const { account, deactivate } = useEthers();
  const balance = useEtherBalance(account);
  const {
    isOpenModal: isOpenCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const {
    isOpenModal: isOpenAddModal,
    openModal: openAddModal,
    closeModal: closeAddModal,
  } = useModal();
  const [loadingCreating, setLoadingCreating] = useState(false);
  const [loadingAdding, setLoadingAdding] = useState(false);

  if (!account) return null;

  const handleCreatingProgress = (status) => {
    setLoadingCreating(status);
    if (!status && isOpenCreateModal) closeCreateModal();
  };
  const handleAddingProgress = (status) => {
    setLoadingAdding(status);
    if (!status && isOpenAddModal) closeAddModal();
  };

  return (
    <div className="flex items-center justify-center lg:space-x-6">
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

          <Popover.Panel className="absolute right-0 z-10 mt-3 overflow-hidden transform rounded-xl bg-neutral-2 lg:left-1/2 lg:w-screen lg:max-w-fit lg:-translate-x-1/2">
            <ul className="w-fit">
              <li className="w-full pt-3 text-center border-b-2 border-neutral-1 lg:px-10">
                {account && <Address address={account} />}
                {balance && <Balance balance={balance} />}
              </li>
              <li
                className="block w-full p-3 cursor-pointer hover:bg-neutral-1 lg:hidden lg:px-10"
                onClick={openAddModal}
              >
                Add existing
              </li>
              <li
                className="block w-full p-3 cursor-pointer hover:bg-neutral-1 lg:hidden lg:px-10"
                onClick={openCreateModal}
              >
                Create new
              </li>
              <li className="block w-full p-3 cursor-pointer hover:bg-neutral-1 lg:hidden lg:px-10">
                <Link href="/explore">
                  <a>Explore</a>
                </Link>
              </li>
              <li className="block w-full p-3 cursor-pointer hover:bg-neutral-1 lg:hidden lg:px-10">
                <Link href="/create">
                  <a>Create</a>
                </Link>
              </li>
              <li
                className="w-full p-3 cursor-pointer hover:bg-neutral-1 lg:px-10"
                onClick={deactivate}
              >
                Log Out
              </li>
            </ul>
          </Popover.Panel>
        </Popover>
      </div>

      <Modal
        title="Creating NFT"
        open={isOpenCreateModal}
        okayBtnProps={{
          type: "submit",
          form: "create-nft-form",
          loading: loadingCreating,
        }}
        onOkay={() => null}
        onClose={closeCreateModal}
      >
        <CreateNFTForm
          id="create-nft-form"
          onProgress={handleCreatingProgress}
        />
      </Modal>
      <Modal
        title="Adding NFT"
        open={isOpenAddModal}
        okayBtnProps={{
          type: "submit",
          form: "add-nft-form",
          loading: loadingAdding,
        }}
        onOkay={() => null}
        onClose={closeAddModal}
      >
        <AddNFTForm id="add-nft-form" onProgress={handleAddingProgress} />
      </Modal>
    </div>
  );
}
