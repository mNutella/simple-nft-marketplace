import { getMulticallAddresses } from "@common/utils/etherHelpers";
import { Localhost, Mainnet } from "@usedapp/core";

export const config = {
  multicallAddresses: getMulticallAddresses(),
  autoConnect: true,
  networks: [Localhost, Mainnet],
  transactionPath: 'transactions'
};
