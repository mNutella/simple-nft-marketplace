import React, { useState } from "react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import Address from "./Address";
import Balance from "./Balance";
import Button from "@common/components/Button";
import Modal from "@modules/modal/components/Modal";
import useModal from "@modules/modal/api/useModal";
import CreateNFTForm from "@modules/marketplace/components/CreateNFTForm";

export default function WalletInfo({ className }) {
  const { account, deactivate } = useEthers();
  const balance = useEtherBalance(account);
  const { isOpenModal, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  if (!account) return null;

  const handleProgress = (status) => {
    setLoading(status);

    if (!status && isOpenModal) closeModal();
  };

  return (
    <div
      className={`mx-auto rounded-lg border border-gray-200 bg-white p-2 text-white shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 ${className} `}
    >
      <p className="mb-2 text-center text-xl font-semibold">Wallet Info</p>
      <div className="mx-auto mb-2 flex w-min flex-wrap whitespace-nowrap rounded-lg p-1 dark:bg-gray-700 sm:flex-nowrap">
        <div className="mr-1 flex-1 px-2 py-1">
          {balance && <Balance balance={balance} />}
        </div>
        <div className="flex-1 rounded-lg px-2 py-1 text-center dark:bg-gray-600">
          {account && <Address address={account} />}
        </div>
      </div>

      {account && (
        <>
          <Button
            className="mx-auto mb-2 block rounded-full border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white"
            onClick={deactivate}
          >
            Sign Out
          </Button>
          <Button
            appendClassName="m-auto sm:ml-auto sm:mr-0 block text-xl"
            onClick={openModal}
          >
            +
          </Button>
          <Modal
            title="Creating NFT"
            open={isOpenModal}
            okayBtnProps={{
              type: "submit",
              form: "create-nft-form",
              loading: loading,
            }}
            onOkay={() => null}
            onClose={closeModal}
          >
            <CreateNFTForm id="create-nft-form" onProgress={handleProgress} />
          </Modal>
        </>
      )}
    </div>
  );
}
