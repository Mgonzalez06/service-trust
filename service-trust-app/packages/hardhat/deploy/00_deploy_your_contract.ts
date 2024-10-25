import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await deployReputationNFT(hre);
  await deployUserRegistry(hre);
  await deployJobListing(hre);
  await deployHiringContract(hre);
};

const deployReputationNFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const reputationNFTDeployment = await deploy("ReputationNFT", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const reputationNFTAddress = reputationNFTDeployment.address;
  console.log("---> ReputationNFT deployed at address:", reputationNFTAddress);
};

const deployUserRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const userRegistryDeployment = await deploy("UserRegistry", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const userRegistryAddress = userRegistryDeployment.address;
  console.log("---> UserRegistry deployed at address:", userRegistryAddress);
};

const deployJobListing: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const userRegistryAddress = (await hre.deployments.get("UserRegistry")).address;

  const jobListingDeployment = await deploy("JobListing", {
    from: deployer,
    args: [userRegistryAddress],
    log: true,
    autoMine: true,
  });
  const jobListingAddress = jobListingDeployment.address;
  console.log("---> JobListing deployed at address:", jobListingAddress);
};

const deployHiringContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const userRegistryAddress = (await hre.deployments.get("UserRegistry")).address;
  const jobListingAddress = (await hre.deployments.get("JobListing")).address;
  const reputationNFTAddress = (await hre.deployments.get("ReputationNFT")).address;

  const hiringContractDeployment = await deploy("HiringContract", {
    from: deployer,
    args: [userRegistryAddress, jobListingAddress, reputationNFTAddress],
    log: true,
    autoMine: true,
  });
  const hiringContractAddress = hiringContractDeployment.address;
  console.log("---> HiringContract deployed at address:", hiringContractAddress);
};

// Exportar la función principal y asignar el tag
export default deployContracts;

// Tags para cada despliegue individual
deployReputationNFT.tags = ["ReputationNFT"];
deployUserRegistry.tags = ["UserRegistry"];
deployJobListing.tags = ["JobListing"];
deployHiringContract.tags = ["HiringContract"];

// Tag para desplegar todos los contratos
deployContracts.tags = ["AllContracts"];