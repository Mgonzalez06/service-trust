const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const CombinedModule = buildModule("CombinedModule", (m) => {
  // Step 1: Deploy the ReputationNFT contract
  const reputationNFT = m.contract("ReputationNFT", [], { id: "ReputationNFT" });

  // Step 2: Deploy the UserRegistry contract
  const userRegistry = m.contract("UserRegistry", [reputationNFT], { id: "UserRegistry" });

  //Step 3: Deploy the JobListing contract
  const jobListing = m.contract("JobListing", [userRegistry], { id: "JobListing" });

  //Step 4: Deploy the HiringContract
  const paymentTokenAddress = "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec"; // Replace this with your existing token address
  const hiringContract = m.contract("HiringContract", [userRegistry,jobListing, paymentTokenAddress], { id: "HiringContract" });

  return { reputationNFT, userRegistry, jobListing, hiringContract };
});

module.exports = CombinedModule;