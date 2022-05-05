import { useCall } from "@usedapp/core";
import { useContracts } from "@modules/contract/context";
import { MARKETPLACE_ADDRESS } from "@configs/contractsConfig";

export function useGetItems() {
  const { contracts } = useContracts();
  const contract = contracts[MARKETPLACE_ADDRESS];
  const { value, error } =
    useCall({
      contract: contract,
      method: "fetchMarketplaceItems",
      args: [],
    }) ?? {};

  if (error) {
    console.error("Error", error.message);
    return { error, data: [] };
  }

  return { error, data: value?.[0] };
}
