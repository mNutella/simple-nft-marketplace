import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useEthers } from "@usedapp/core";
import { Controller, useForm } from "react-hook-form";
import Button from "@common/components/Button";
import Input from "@common/components/Input";
import { useCreateNFT } from "@modules/marketplace/api/useCreateNFT";
import { useIPFSApi } from "@modules/ipfs/useIPFSApi";
import { getRandomInt } from "@common/utils/math";

const initFormValues = {
  name: "",
  symbol: "",
  url: "",
  price: 0,
  file: undefined,
};

export default function CreateNFTForm() {
  const { account } = useEthers();
  const { inProgress, state, error, setError, createNFT } =
    useCreateNFT(account);
  const { uploadData } = useIPFSApi();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      ...initFormValues,
    },
  });
  const watchFileUrl = watch("fileUrl", undefined);
  const imageRef = useRef(null).current;

  useEffect(() => {
    register("fileUrl");
  }, [register]);

  useEffect(() => () => URL.revokeObjectURL(watchFileUrl), [watchFileUrl]);

  useEffect(() => {
    if (state.status === "Success") {
      reset({ ...initFormValues });
    }
  }, [state.status, reset]);

  if (!account) return null;

  const handleFormSubmit = async (data) => {
    // TODO: add thumbnail
    // const imageHash = await uploadData(Buffer(data.file.reader?.result));
    // const metaDataHash = await uploadData(
    //   JSON.stringify({
    //     rareness: getRandomInt(100),
    //     origin: imageHash,
    //   })
    // );

    // await createNFT(data.name, data.symbol, metaDataHash, data.price);
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
              id="name"
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
              id="symbol"
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
          name="file"
          control={control}
          rules={{
            required: { value: true, message: "This is required input" },
          }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id="file"
              type="file"
              label="File"
              accept="image/*"
              helper="File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB"
              error={errors.file}
              onChange={(e) => {
                setError(false);
                setValue("fileUrl", URL.createObjectURL(e.fileData));
                onChange(e);
              }}
              {...rest}
            />
          )}
        />
        {watchFileUrl && (
          <Image
            className="rounded-lg max-w-10 mb-6 object-cover"
            width={100}
            height={100}
            ref={imageRef}
            src={watchFileUrl}
            alt="preview image"
          />
        )}
        {/* <Controller
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
        /> */}
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
        <Button type="submit" text="Create NFT" loading={inProgress} />
      </form>
    </div>
  );
}
