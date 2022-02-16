const SimpleMarketplaceContract = artifacts.require("SimpleMarketplace");

module.exports = function (deployer) {
  deployer.deploy(SimpleMarketplaceContract);
};
