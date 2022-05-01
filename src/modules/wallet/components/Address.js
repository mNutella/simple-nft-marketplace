import { cropAddress } from "@common/utils/strings";
import React from "react";

export default function Address({ address }) {
  return (
    <p className="px-4 py-1 font-bold text-md">
      {cropAddress(address, 4, 6)}
    </p>
  );
}
