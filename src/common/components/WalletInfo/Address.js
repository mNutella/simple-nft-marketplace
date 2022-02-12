import React from "react";

export default function Address({ address }) {
  return (
    <p className="text-sm font-medium">
      {address.slice(0, 4)}...
      {address.slice(address.length - 6, address.length)}
    </p>
  );
}
