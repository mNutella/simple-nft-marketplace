export function getIPFSFileUrl(hash) {
  return process.env.NEXT_PUBLIC_IPFS_URL + hash;
}
