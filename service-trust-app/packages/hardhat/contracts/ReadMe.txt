Steps to deploy contracts in localhost with hardhat:

Run these commands in folder smart-contracts
1 - Install dependencies:
    npm install
2 - Run local blockchain:
    npx hardhat node
3 - Compile the contracts:
    npx hardhat compile
4 - Run ignition module file to deploy contracts: 
    npx hardhat ignition deploy ./ignition/modules/CombinedModule.js
    