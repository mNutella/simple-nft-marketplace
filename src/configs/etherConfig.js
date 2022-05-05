import {
  getMulticallAddresses,
  getNetworks,
  getReadOnlyChainId,
  getReadOnlyUrls,
} from "@common/utils/etherHelpers";

console.log(
  getReadOnlyChainId(),
  getMulticallAddresses(),
  getReadOnlyUrls(),
  getNetworks()
);

export const config = {
  readOnlyChainId: getReadOnlyChainId(),
  multicallAddresses: getMulticallAddresses(),
  readOnlyUrls: getReadOnlyUrls(),
  networks: getNetworks(),
  transactionPath: "transactions",
};
