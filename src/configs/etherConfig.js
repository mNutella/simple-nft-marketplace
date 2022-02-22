import { getMulticallAddresses } from "@common/utils/etherHelpers";

export const config = {
  multicallAddresses: getMulticallAddresses(),
  autoConnect: true,
  transactionPath: "transactions",
};
