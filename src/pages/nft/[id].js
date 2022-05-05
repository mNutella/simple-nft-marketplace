import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NFTHeader from "@common/components/NFTHeader";
import MainLayout from "@layouts/MainLayout";
import { useGetItem } from "@modules/marketplace/api/useGetItem";
import { useBuyNFT } from "@modules/marketplace/api/useBuyNFT";
import { getIPFSFileUrl } from "@common/utils/ipfsHelpers";
import { useEthers } from "@usedapp/core";

export default function NFTPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: nftData } = useGetItem(id);
  const { account } = useEthers();
  const [data, setData] = useState(null);
  const { buyNFT, inProgress, success } = useBuyNFT();

  useEffect(() => {
    if (nftData) {
      (async () => {
        const metaInfo = await (await fetch(nftData[7])).json();
        setData({
          id: nftData[0].toString(),
          name: metaInfo?.name,
          price: nftData[5],
          image: getIPFSFileUrl(metaInfo?.origin),
          sellerAddress: nftData[3],
          ownerAddress: nftData[4],
          description: metaInfo?.description,
        });
      })();
    }
  }, [nftData]);

  useEffect(() => {
    if (success && account) {
      setData((prev) => ({ ...prev, ownerAddress: account }));
      router.replace("/explore");
    }
  }, [success]);

  const handleBuyNFT = async () => {
    if (!nftData) return;
    await buyNFT(nftData[1], nftData[0], nftData[5]);
  };

  return (
    <MainLayout className="lg:flex lg:h-screen lg:flex-col lg:justify-between">
      <NFTHeader
        nftData={data}
        currentAddress={account}
        buyLoading={inProgress}
        onBuy={handleBuyNFT}
      />
    </MainLayout>
  );
}
