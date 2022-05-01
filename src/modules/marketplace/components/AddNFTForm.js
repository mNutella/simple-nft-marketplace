import React, { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { Controller, useForm } from "react-hook-form";
import Input from "@common/components/Input";
import { useAddNFT } from "@modules/marketplace/api/useAddNFT";

const initFormValues = {
  nftAddress: "",
  tokenId: "",
  price: 0,
};

export default function AddNFTForm({ id, onProgress }) {
  const { account } = useEthers();
  const { state, error, setError, addNFT } = useAddNFT(account);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...initFormValues,
    },
  });

  useEffect(() => {
    if (state.status === "Success") {
      reset({ ...initFormValues });
      onProgress && onProgress(false);
    }
  }, [state.status, reset, onProgress]);

  if (!account) return null;

  const handleFormSubmit = async (data) => {
    onProgress && onProgress(true);

    await addNFT(data.nftAddress, data.tokenId, data.price);
  };

  return (
    <div>
      {error && (
        <p className="mb-2 text-center text-base text-red-500">
          Something went wrong, try repeat transaction{" "}
          <span className="text-lg">🥺</span>
        </p>
      )}
      <form id={id} onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="nftAddress"
          control={control}
          rules={{
            required: { value: true, message: "This is required input" },
          }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id="nftAddress"
              label="Address"
              placeholder="NFT address"
              error={errors.nftAddress}
              onChange={(e) => {
                setError(false);
                onChange(e);
              }}
              {...rest}
            />
          )}
        />
        <Controller
          name="tokenId"
          control={control}
          rules={{
            required: { value: true, message: "This is required input" },
          }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id="tokenId"
              label="Id"
              placeholder="Token number"
              error={errors.tokenId}
              onChange={(e) => {
                setError(false);
                onChange(e);
              }}
              {...rest}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{
            required: { value: true, message: "This is required input" },
            min: { value: 0.0007, message: "Price should be at least 0.0007" },
          }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id="price"
              type="number"
              label="Price"
              placeholder="0.007"
              error={errors.price}
              onChange={(e) => {
                setError(false);
                onChange(e);
              }}
              {...rest}
            />
          )}
        />
      </form>
    </div>
  );
}
