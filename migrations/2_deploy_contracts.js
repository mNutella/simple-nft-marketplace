const SimpleMarketplaceContract = artifacts.require("SimpleMarketplace");
const SimpleNFTContract = artifacts.require("SimpleNFT");

module.exports = function (deployer) {
  deployer.deploy(SimpleMarketplaceContract);
  deployer.deploy(SimpleNFTContract);
};
