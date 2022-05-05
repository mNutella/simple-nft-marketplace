import {
  getMulticallAddresses,
  getNetworks,
  getReadOnlyChainId,
  getReadOnlyUrls,
} from "@common/utils/etherHelpers";

export const config = {
  readOnlyChainId: getReadOnlyChainId(),
  multicallAddresses: getMulticallAddresses(),
  readOnlyUrls: getReadOnlyUrls(),
  networks: getNetworks(),
  transactionPath: "transactions",
};
