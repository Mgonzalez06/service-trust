import { ethers } from "ethers";
import userRegistryABI from "../../../artifacts/contracts/UserRegistrty.sol/UserRegistrty.json";
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

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      userRegistryAddress,
      userRegistryABI.abi,
      signer
    );

    const transaction = await contract.registerUser(
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
    );
    await transaction.wait();
    console.log("Transaction hash:", transaction.hash);

    console.log("Signed up successfully");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};
