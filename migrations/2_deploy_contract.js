const LandRegistry = artifacts.require("LandRegistry");

module.exports = async function (deployer, network, accounts) {
  const defaultOwner = accounts[0]; // The first account in Truffle
  await deployer.deploy(LandRegistry, defaultOwner);

};
