import Image from "next/image";
import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { Controller, useForm } from "react-hook-form";
import Input from "@common/components/Input";
import { getRandomInt } from "@common/utils/mathHelpers";
import Button from "@common/components/Button";
import { useCreateNFT } from "@modules/marketplace/api/useCreateNFT";
import { useIPFSApi } from "@modules/ipfs/useIPFSApi";
import { useImageResize } from "@modules/image-resizer/useImageResize";
import { THUMBNAIL_MAX_SIDE_LENGTH } from "@configs/coreConfig";
import Spinner from "@common/components/SVGs/Spinner";

const initFormValues = {
  name: "",
  desc: "",
  url: "",
  price: "",
  file: undefined,
};

export default function CreateNFTForm({ id, onProgress }) {
  const { account } = useEthers();
  const { state, error, setError, createNFT } = useCreateNFT(account);
  const { uploadData } = useIPFSApi();
  const { resize } = useImageResize();
  const [loading, setLoading] = useState(false);
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
    <div className="relative p-6 overflow-hidden rounded-lg bg-neutral-1 lg:mx-auto lg:max-w-lg">
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
          name="name"
          control={control}
          rules={{
            required: { value: true, message: "This is required input" },
          }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id="name"
              placeholder="Name"
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
              type="textarea"
              placeholder="Description"
              error={errors.desc}
              onChange={(e) => {
                setError(false);
                onChange(e);
              }}
              {...rest}
            />
          )}
        />
        <div>
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
            <div className="relative mt-2 max-w-[100px]">
              <Image
                className="rounded-lg"
                layout="responsive"
                width={100}
                height={100}
                objectFit="cover"
                src={watchThumbnail.image?.src}
                alt="Preview image"
              />
            </div>
          )}
        </div>
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
          className={`w-full border-2 border-transparent bg-secondary px-8 py-3 text-white shadow-secondary/40 transition duration-150 hover:border-secondary hover:bg-transparent`}
          type="submit"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
