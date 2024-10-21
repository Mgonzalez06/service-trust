const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const UserRegistryModule = buildModule("UserRegistryModule", (m) => {
  // Deploy the UserRegistry contract
  const userRegistry = m.contract("UserRegistry");

  return { userRegistry };
});

module.exports = UserRegistryModule;