import { useEthers } from "@usedapp/core";
import MainLayout from "@layouts/MainLayout";
import { useGetItems } from "@modules/marketplace/api/useGetItems";
import ExploreContainer from "@modules/marketplace/components/ExploreContainer";

export default function ExplorePage() {
  const { account } = useEthers();
  const { data } = useGetItems();

  return (
    <MainLayout
      className="lg:flex lg:min-h-screen lg:flex-col lg:justify-between"
    >
      <ExploreContainer data={data} address={account} />
    </MainLayout>
  );
}
