import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { Controller, useForm } from "react-hook-form";
import Button from "@common/components/Button";
import Input from "@common/components/Input";
import { useAddNFT } from "@modules/marketplace/api/useAddNFT";
import Spinner from "@common/components/SVGs/Spinner";

const initFormValues = {
  nftAddress: "",
  tokenId: "",
  price: "",
};

export default function AddNFTForm({ id, onProgress }) {
  const { account } = useEthers();
  const { state, error, setError, addNFT } = useAddNFT(account);
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    }
  }, [state.status, reset, onProgress]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  if (!account) return null;

  const handleFormSubmit = async (data) => {
    setLoading(true);

    await addNFT(data.nftAddress, data.tokenId, data.price);
  };

  return (
    <div className="relative p-6 rounded-lg bg-neutral-1 lg:mx-auto lg:max-w-lg">
      {loading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-neutral-1 opacity-80">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {error && (
        <p className="mb-2 text-base text-center text-red-500">
          Something went wrong, try repeat transaction{" "}
          <span className="text-lg">🥺</span>
        </p>
      )}
      <form
        id={id}
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <Controller
          name="nftAddress"
          control={control}
          rules={{
            required: { value: true, message: "This is required input" },
          }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id="nftAddress"
              placeholder="Contract Address"
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
              placeholder="Token Id"
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
              placeholder="Price"
              error={errors.price}
              onChange={(e) => {
                setError(false);
                onChange(e);
              }}
              {...rest}
            />
          )}
        />
        <Button
          className="w-full px-8 py-3 text-white transition duration-150 border-2 border-transparent bg-secondary shadow-secondary/40 hover:border-secondary hover:bg-transparent"
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
}
