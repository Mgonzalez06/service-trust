const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const NFTRewardModule = buildModule("NFTRewardModule", (m) => {
  // Deploy the NFTReward contract
  const nftReward = m.contract("NFTReward");

  return { nftReward };
});

module.exports = NFTRewardModule;