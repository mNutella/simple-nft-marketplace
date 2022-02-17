import React, { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { Controller, useForm } from "react-hook-form";
import Button from "@common/components/Button";
import Input from "@common/components/Input";
import { useCreateNFT } from "@modules/marketplace/api/useCreateNFT";

const initFormValues = {
  name: "",
  symbol: "",
  url: "",
  price: 0,
};

export default function CreateNFTForm() {
  const { account } = useEthers();
  const { inProgress, state, error, setError, createNFT } =
    useCreateNFT(account);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      ...initFormValues,
    },
  });

  useEffect(() => {
    if (state.status === "Success") {
      reset({ ...initFormValues });
    }
  }, [state.status, reset]);

  if (!account) return null;

  const handleFormSubmit = async (data) => {
    await createNFT(data.name, data.symbol, data.url, data.price);
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
      <p className="text-xl text-white text-center font-semibold mb-2">
        Creating NFT
      </p>
      {error && (
        <p className="text-base text-red-500 text-center mb-2">
          Something went wrong, try repeat transaction{" "}
          <span className="text-lg">🥺</span>
        </p>
      )}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: { value: true, message: "This is required input" },
          }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              label="Name"
              placeholder="SimpleNFT"
              error={errors.name}
              onChange={(e) => {
                setError(false);
                onChange(e);
              }}
              {...rest}
            />
          )}
        />
        <Controller
          name="symbol"
          control={control}
          rules={{
            required: { value: true, message: "This is required input" },
          }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              label="Symbol"
              placeholder="MFT"
              error={errors.symbol}
              onChange={(e) => {
                setError(false);
                onChange(e);
              }}
              {...rest}
            />
          )}
        />
        <Controller
          name="url"
          control={control}
          rules={{
            required: { value: true, message: "This is required input" },
          }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              type="url"
              label="Meta Url"
              placeholder="MFT"
              error={errors.url}
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
              type="number"
              label="Price"
              placeholder="MFT"
              error={errors.price}
              onChange={(e) => {
                setError(false);
                onChange(e);
              }}
              {...rest}
            />
          )}
        />
        <Button type="submit" text="Create NFT" loading={inProgress} />
      </form>
    </div>
  );
}
