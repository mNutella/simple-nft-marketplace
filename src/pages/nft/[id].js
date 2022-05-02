import NFTHeader from "@common/components/NFTHeader";
import MainLayout from "@layouts/MainLayout";

const NFT_DATA = {
  id: 1,
  name: "M2 Mutant Serum",
  price: 69,
  image: "/images/nft-1.jpg",
  ownerAddress: "0x076009BEd79A61e6c4c3DBFF660b352b3Ffb743E",
};

export default function NFTPage() {
  return (
    <MainLayout className="lg:flex lg:h-screen lg:flex-col lg:justify-between">
      <NFTHeader nftData={NFT_DATA} />
    </MainLayout>
  );
}
