const SimpleNFTContract = artifacts.require("SimpleNFT");
const SimpleMarketplaceContract = artifacts.require("SimpleMarketplace");

module.exports = function (deployer) {
  deployer.deploy(SimpleNFTContract, "SimpleMarketplaceNFTContract", "NFT");
  deployer.deploy(
    SimpleMarketplaceContract,
    "0x0000000000000000000000000000000000000000"
  );
};
