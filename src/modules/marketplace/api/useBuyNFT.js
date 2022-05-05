import { useContractFunction } from "@usedapp/core";
import { formatEther, parseEther } from "@ethersproject/units";
import useTransactionStatuses from "@common/hooks/useTransactionStatuses";
import { useContracts } from "@modules/contract/context";
import { MARKETPLACE_ADDRESS } from "@configs/contractsConfig";

export function useBuyNFT() {
  const { contracts } = useContracts();
  const contract = contracts[MARKETPLACE_ADDRESS];
  const {
    state,
    send: sendCreateMarketplaceSale,
    resetState,
  } = useContractFunction(contract, "createMarketplaceSale", {
    transactionName: "saleNFT",
  });
  const { inProgress, setInProgress, error, success } =
    useTransactionStatuses(state);

  const buyNFT = async (nftAddress, itemId, price) => {
    setInProgress(true);

    await sendCreateMarketplaceSale(nftAddress, itemId, {
      value: parseEther(formatEther(price)),
    });
  };

  return {
    inProgress,
    error,
    success,
    state,
    buyNFT,
    resetState,
  };
}
