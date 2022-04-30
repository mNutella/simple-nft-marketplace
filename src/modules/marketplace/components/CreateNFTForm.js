import Image from "next/image";
import React, { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { Controller, useForm } from "react-hook-form";
import Input from "@common/components/Input";
import { getRandomInt } from "@common/utils/mathHelpers";
import { useCreateNFT } from "@modules/marketplace/api/useCreateNFT";
import { useIPFSApi } from "@modules/ipfs/useIPFSApi";
import { useImageResize } from "@modules/image-resizer/useImageResize";
import { THUMBNAIL_MAX_SIDE_LENGTH } from "@configs/coreConfig";

const initFormValues = {
  name: "",
  desc: "",
  url: "",
  price: 0,
  file: undefined,
};

export default function CreateNFTForm({ id, onProgress }) {
  const { account } = useEthers();
  const { state, error, setError, createNFT } = useCreateNFT(account);
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
      onProgress && onProgress(false);
    }
  }, [state.status, reset, onProgress]);

  if (!account) return null;

  const handleFormSubmit = async (data) => {
    onProgress && onProgress(true);

    const thumbnailHash = await uploadData(data.thumbnail.buffer);
    const imageHash = await uploadData(Buffer(data.file.reader?.result));
    const metaDataHash = await uploadData(
      JSON.stringify({
        name: data.name,
        description: data.desc,
        rareness: getRandomInt(100),
        origin: imageHash,
        thumbnail: thumbnailHash,
      })
    );
    await createNFT(metaDataHash, data.price);
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
          name="desc"
          control={control}
          rules={{
            required: { value: true, message: "This is required input" },
          }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id="desc"
              label="Description"
              type="textarea"
              placeholder="NFT description"
              error={errors.desc}
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
              label="Picture"
              accept="image/*"
              helper="File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB"
              error={errors.file}
              onChange={async (e) => {
                setError(false);
                const resizedImg = await resize(
                  new Blob([e.reader?.result]),
                  THUMBNAIL_MAX_SIDE_LENGTH
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
            className="max-w-10 mb-6 rounded-lg"
            width={100}
            height={100}
            objectFit="cover"
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
      </form>
    </div>
  );
}
