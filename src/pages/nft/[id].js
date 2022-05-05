import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NFTHeader from "@common/components/NFTHeader";
import MainLayout from "@layouts/MainLayout";
import { useGetItem } from "@modules/marketplace/api/useGetItem";
import { getIPFSFileUrl } from "@common/utils/ipfsHelpers";
import { useEthers } from "@usedapp/core";

export default function NFTPage() {
  const { query } = useRouter();
  const { id } = query;
  const { data: nftData } = useGetItem(id);
  const { account } = useEthers();
  const [data, setData] = useState(null);

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
          description: metaInfo?.description,
        });
      })();
    }
  }, [nftData]);

  return (
    <MainLayout className="lg:flex lg:h-screen lg:flex-col lg:justify-between">
      <NFTHeader nftData={data} currentAddress={account} />
    </MainLayout>
  );
}
