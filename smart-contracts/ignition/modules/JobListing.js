const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JobListingModule = buildModule("JobListingModule", (m) => {
  // Deploy the JobListing contract without the NFTReward contract
  const jobListing = m.contract("JobListing");

  return { jobListing };
});

module.exports = JobListingModule;