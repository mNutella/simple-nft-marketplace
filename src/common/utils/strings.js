export function cropAddress(address, from, to) {
  if (!address) return "";
  if (from == null || to == null) return address;

  return (
    address.slice(0, from) +
    "..." +
    address.slice(address.length - to, address.length)
  );
}
