const hre = require("hardhat");


async function main() {
  // Obtener el contrato JobListing desde Hardhat
  const JobListing = await hre.ethers.getContractFactory("JobListing");
  
  // Desplegar el contrato
  const jobListing = await JobListing.deploy();
  
  // Esperar a que el contrato sea desplegado
  await jobListing.waitForDeployment(); // Reemplaza `.deployed()` por `.waitForDeployment()`

  // Obtener la dirección del contrato desplegado
  const contractAddress = await jobListing.getAddress(); // Obtener la dirección del contrato
  
  console.log("JobListing deployed to:", contractAddress);
}

// Manejo de errores en el despliegue
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
