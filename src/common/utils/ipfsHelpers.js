export function getIPFSFileUrl(url) {
  if (!url || url.startsWith("https://ipfs.io/ipfs/")) {
    return url;
  }

  if (url.startsWith("ipfs://")) {
    url = url.replace("ipfs://", "");
    return process.env.NEXT_PUBLIC_IPFS_URL + url;
  }

  return process.env.NEXT_PUBLIC_IPFS_URL + url;
}
