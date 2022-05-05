import MainLayout from "@layouts/MainLayout";
import DiscordCTA from "@common/components/DiscordCTA";
import HomeFAQ from "@common/components/HomeFAQ";
import HomeFeaturedArtworks from "@common/components/HomeFeaturedArtworks";
import HomeHeader from "@common/components/HomeHeader";
import HomeTopTraders from "@common/components/HomeTopTraders";
import NewsletterCTA from "@common/components/NewsletterCTA";

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
      "Create your NFTs. Add name, description, image, price and more",
    image: "/images/home-artwork.webp",
    link: "/create",
    linkText: "Create NFT",
  },
  {
    id: 2,
    title: "Upload",
    description:
      "Upload your work, customize your NFTs with properties, stats, and unlockable content",
    image: "/images/home-upload.webp",
    link: "/create?type=add",
    linkText: "Add NFT",
  },
  {
    id: 3,
    title: "Trade",
    description:
      "Set up and choose between auctions, fixed-price, listings, and declining-price listings",
    image: "/images/home-trade.webp",
    link: "/explore",
    linkText: "Explore",
  },
];

const TOP_TRADERS_DATA = [
  {
    id: 1,
    address: "0xe00edc0564215fcde68d3bac7671d72ea3d15af3",
    budget: 55562,
    image: "/images/trader-1.webp",
  },
  {
    id: 2,
    address: "0xd6fa25fe3aa2ef477f1531c468a8134c4d06aee2",
    budget: 49864,
    image: "/images/trader-2.webp",
  },
  {
    id: 3,
    address: "0xde3702504376a41c87746942f5f5450be83f295d",
    budget: 45000,
    image: "/images/trader-3.webp",
  },
  {
    id: 4,
    address: "0x957e3b7c98ca23dbc89b7358f90ac1a8d5b2655e",
    budget: 40786,
    image: "/images/trader-4.webp",
  },
  {
    id: 5,
    address: "0x86c3d20c8c1e3f9e102baa13fd8a786cd63d096d",
    budget: 38214,
    image: "/images/trader-5.webp",
  },
  {
    id: 6,
    address: "0xcca820619e667c8c168434a886587e7b195c6457",
    budget: 30653,
    image: "/images/trader-6.webp",
  },
  {
    id: 7,
    address: "0x0dbd278198058ff0d3b696cb218968c4c751060c",
    budget: 21345,
    image: "/images/trader-7.webp",
  },
  {
    id: 8,
    address: "0x897927ac4574d53014fa1edf3ce28426dd1beb1a",
    budget: 5923,
    image: "/images/trader-8.webp",
  },
  {
    id: 9,
    address: "0x87d5140224e6468363455a70d03a3591e1d02b8e",
    budget: 1229,
    image: "/images/trader-9.webp",
  },
];

export default function HomePage() {
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
