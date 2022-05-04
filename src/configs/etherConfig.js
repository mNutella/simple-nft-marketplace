import { getMulticallAddresses, getReadOnlyUrls } from "@common/utils/etherHelpers";
import { Mumbai } from "@usedapp/core";

export const config = {
  readOnlyChainId: Mumbai.chainId,
  multicallAddresses: getMulticallAddresses(),
  readOnlyUrls: getReadOnlyUrls(),
  networks: [Mumbai],
  transactionPath: "transactions",
};
