import { useCall } from "@usedapp/core";
import { useContracts } from "@modules/contract/context";
import { MARKETPLACE_ADDRESS } from "@configs/contractsConfig";

export function useGetItem(itemId) {
  const { contracts } = useContracts();
  const contract = contracts[MARKETPLACE_ADDRESS];
  const { value, error } =
    useCall(
      itemId && {
        contract: contract,
        method: "fetchMarketplaceItem",
        args: [Number(itemId)],
      }
    ) ?? {};
  return { error, data: value?.[0] };
}
