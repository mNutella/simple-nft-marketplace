import React from "react";
import { useEthers } from "@usedapp/core";
import { Controller, useForm } from "react-hook-form";
import SIMPLE_NFT from "@public/contracts-data/simpleNft.json";
import Button from "@common/components/Button";
import Input from "@common/components/Input";
import { useCreateNFT } from "../api/useCreateNFT";

export default function CreateNFTForm() {
  const { account } = useEthers();
  const { inProgress, createNFT } = useCreateNFT(account);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      nftName: "",
      nftSymbol: "",
    },
  });

  if (!account) return null;

  const handleFormSubmit = async (data) => {
    await createNFT(
      "SimpleNFT",
      SIMPLE_NFT.abi,
      SIMPLE_NFT.bytecode,
      data.nftName,
      data.nftSymbol
    );

    reset({ nftName: "", nftSymbol: "" });
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="nftName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label="NFT Name"
              placeholder="SimpleNFT"
              error={!!errors.nftName}
              {...field}
            />
          )}
        />
        <Controller
          name="nftSymbol"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label="NFT Symbol"
              placeholder="MFT"
              error={!!errors.nftSymbol}
              {...field}
            />
          )}
        />
        <Button type="submit" text="Create NFT" loading={inProgress} />
      </form>
    </div>
  );
}
