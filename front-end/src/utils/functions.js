import { ethers } from "ethers";
import marketplaceABI from "../../../artifacts/contracts/Marketplace.sol/Marketplace.json"; // Make sure this is the correct path to your ABI
import nftABI from "../../../artifacts/contracts/MyNFT.sol/MyNFT.json"; // Make sure this is the correct path to your ABI
import { connectWallet } from "./connectWallet"; // Updated import

const userRegistryAddress = "0x32E7E9678407aA2430796E93a1A27D7D251FEE62"; // Replace with your deployed contract address

export const signUp = async (
  name,
  lastName,
  password,
  country,
  city,
  nationality,
  birthdate,
  email,
  phone,
  skills,
  walletAddress
) => {
  try {
    if (!connected) {
      console.error("Wallet not connected.");
      return;
    }

    // Obtain the signer after ensuring the wallet is connected
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log("Signer:", signer);

    // Create the marketplace contract instance
    const contract = new ethers.Contract(
      userRegistryAddress,
      userRegistryABI.abi,
      signer
    );

    const transaction = await contract.registerUser(
      name,
      lastName,
      country,
      city,
      nationality,
      birthdate,
      email,
      phone,
      skills,
      walletAddress
    );
    await transaction.wait();
    console.log("Transaction hash:", transaction.hash);

    console.log("Signed up successfully");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const logIn = asyn();
