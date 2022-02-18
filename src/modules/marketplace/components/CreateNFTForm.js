import Image from "next/image";
import React, { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { Controller, useForm } from "react-hook-form";
import Button from "@common/components/Button";
import Input from "@common/components/Input";
import { useCreateNFT } from "@modules/marketplace/api/useCreateNFT";
import { useIPFSApi } from "@modules/ipfs/useIPFSApi";
import { useImageResize } from "@modules/image-resizer/useImageResize";
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
  const { resize } = useImageResize();
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
  const watchThumbnail = watch("thumbnail", undefined);

  useEffect(() => {
    register("thumbnail");
  }, [register]);

  useEffect(() => () => URL.revokeObjectURL(watchThumbnail), [watchThumbnail]);

  useEffect(() => {
    if (state.status === "Success") {
      reset({ ...initFormValues });
    }
  }, [state.status, reset]);

  if (!account) return null;

  const handleFormSubmit = async (data) => {
    const thumbnailHash = await uploadData(data.thumbnail.buffer);
    // const imageHash = await uploadData(Buffer(data.file.reader?.result));
    // const metaDataHash = await uploadData(
    //   JSON.stringify({
    //     rareness: getRandomInt(100),
    //     origin: imageHash,
    //   })
    // );
    // console.log(thumbnailHash, imageHash, metaDataHash);
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
              onChange={async (e) => {
                setError(false);
                const resizedImg = await resize(
                  new Blob([e.reader?.result]),
                  228
                );
                setValue("thumbnail", resizedImg);
                onChange(e);
              }}
              {...rest}
            />
          )}
        />
        {watchThumbnail?.image && (
          <Image
            className="rounded-lg max-w-10 mb-6 object-cover"
            width={100}
            height={100}
            src={watchThumbnail.image?.src}
            alt="preview image"
          />
        )}
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
