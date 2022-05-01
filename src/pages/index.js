// import Explore from "@modules/marketplace/components/Explore";
// import Modal from "@modules/modal/components/Modal";
{
  /* <main className="container mx-auto">
<Explore />
<Modal />
</main> */
}

const HEADER_DATA = {
  id: 1,
  name: "M2 Mutant Serum",
  price: 69,
  image: "/images/nft-1.jpg",
};

const FEAT_ARTWORKS_DATA = [
  {
    id: 1,
    name: "M1 Mutant Serum",
    price: 0.005,
    image: "/images/nft-1.jpg",
  },
  {
    id: 2,
    name: "M2 Mutant Serum",
    price: 55,
    image: "/images/nft-2.jpg",
  },
  {
    id: 3,
    name: "M2 Mutant Serum",
    price: 999,
    image: "/images/nft-3.jpg",
  },
];

const FAQ_DATA = [
  {
    id: 1,
    title: "Create Artwork",
    description:
      "Meet the Trade Wise team, trades and artists for platform updates, announcements, and more...",
    image: "/images/home-faq-artwork.png",
  },
  {
    id: 2,
    title: "Upload",
    description:
      "Meet the Trade Wise team, trades and artists for platform updates, announcements, and more...",
    image: "/images/home-faq-artwork.png",
  },
  {
    id: 3,
    title: "Trade",
    description:
      "Meet the Trade Wise team, trades and artists for platform updates, announcements, and more...",
    image: "/images/home-faq-artwork.png",
  },
];

const TOP_TRADERS_DATA = [
  {
    id: 1,
    address: "0x076009BEd79A61e6c4c3DBFF660b352b3Ffb743E",
    budget: 1229,
    image: "/images/nft-1.jpg",
  },
  {
    id: 2,
    address: "0x076009BEd79A61e6c4c3DBFF660b352b3Ffb743E",
    budget: 1229,
    image: "/images/nft-1.jpg",
  },
  {
    id: 3,
    address: "0x076009BEd79A61e6c4c3DBFF660b352b3Ffb743E",
    budget: 1229,
    image: "/images/nft-1.jpg",
  },
  {
    id: 4,
    address: "0x076009BEd79A61e6c4c3DBFF660b352b3Ffb743E",
    budget: 1229,
    image: "/images/nft-1.jpg",
  },
  {
    id: 5,
    address: "0x076009BEd79A61e6c4c3DBFF660b352b3Ffb743E",
    budget: 1229,
    image: "/images/nft-1.jpg",
  },
  {
    id: 6,
    address: "0x076009BEd79A61e6c4c3DBFF660b352b3Ffb743E",
    budget: 1229,
    image: "/images/nft-1.jpg",
  },
  {
    id: 7,
    address: "0x076009BEd79A61e6c4c3DBFF660b352b3Ffb743E",
    budget: 1229,
    image: "/images/nft-1.jpg",
  },
  {
    id: 8,
    address: "0x076009BEd79A61e6c4c3DBFF660b352b3Ffb743E",
    budget: 1229,
    image: "/images/nft-1.jpg",
  },
  {
    id: 9,
    address: "0x076009BEd79A61e6c4c3DBFF660b352b3Ffb743E",
    budget: 1229,
    image: "/images/nft-1.jpg",
  },
];

import MainLayout from "@layouts/MainLayout";
import DiscordCTA from "@common/components/DiscordCTA";
import HomeFAQ from "@common/components/HomeFAQ";
import HomeFeaturedArtworks from "@common/components/HomeFeaturedArtworks";
import HomeHeader from "@common/components/HomeHeader";
import HomeTopTraders from "@common/components/HomeTopTraders";
import NewsletterCTA from "@common/components/NewsletterCTA";

export default function Home() {
  return (
    <MainLayout>
      <HomeHeader nftData={HEADER_DATA} />
      <HomeFeaturedArtworks items={FEAT_ARTWORKS_DATA} />
      <NewsletterCTA />
      <HomeTopTraders items={TOP_TRADERS_DATA} />
      <HomeFAQ items={FAQ_DATA} />
      <DiscordCTA />
    </MainLayout>
  );
}
