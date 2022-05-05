import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NFTHeader from "@common/components/NFTHeader";
import MainLayout from "@layouts/MainLayout";
import { useGetItem } from "@modules/marketplace/api/useGetItem";
import { getIPFSFileUrl } from "@common/utils/ipfsHelpers";

export default function NFTPage() {
  const { query } = useRouter();
  const { id } = query;
  const { data: nftData } = useGetItem(id);
  const [data, setData] = useState({});

  useEffect(() => {
    // console.log(id, nftData);
    if (nftData) {
      (async () => {
        try {
          const metaInfo = await (await fetch(nftData[7])).json();
          console.log(metaInfo);
          setData({
            id: nftData[0].toString(),
            name: metaInfo?.name,
            price: nftData[5],
            image: getIPFSFileUrl(metaInfo?.origin),
            sellerAddress: nftData[3],
          });
        } catch (error) {}
      })();
    }
  }, [nftData]);

  return (
    <MainLayout className="lg:flex lg:h-screen lg:flex-col lg:justify-between">
      <NFTHeader nftData={data} />
    </MainLayout>
  );
}
