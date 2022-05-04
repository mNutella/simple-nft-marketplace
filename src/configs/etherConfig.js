import { getMulticallAddresses, getReadOnlyUrls } from "@common/utils/etherHelpers";

export const config = {
  multicallAddresses: getMulticallAddresses(),
  readOnlyUrls: getReadOnlyUrls(),
  transactionPath: "transactions",
};
