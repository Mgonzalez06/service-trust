import { ethers } from "ethers";
// import userRegistryABI from "../../../artifacts/contracts/UserRegistrty.sol/UserRegistrty.json";
// const userRegistryAddress = "0x32E7E9678407aA2430796E93a1A27D7D251FEE62";
import { createNewWallet } from "./connectWallet";
export const registerUser = async (
  name,
  lastName,
  password,
  country,
  city,
  nationality,
  birthdate,
  email,
  phone,
  skills
) => {
  try {
    const newWallet = await createNewWallet();

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      // userRegistryAddress,
      // userRegistryABI.abi,
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
      newWallet.address
    );
    await transaction.wait();
    console.log("Transaction hash:", transaction.hash);

    console.log("Signed up successfully");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const updateUserProfile = async (
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
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      // userRegistryAddress,
      // userRegistryABI.abi,
      signer
    );

    const transaction = await contract.updateUserProfile(
      name,
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

export const getUserProfile = async (walletAddress) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      // userRegistryAddress,
      // userRegistryABI.abi,
      provider
    );

    const profile = await contract.getUserProfile(walletAddress);
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

export const getAllUsers = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      // userRegistryAddress,
      // userRegistryABI.abi,
      provider
    );

    const users = await contract.getAllUsers();
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      // userRegistryAddress,
      // userRegistryABI.abi,
      provider
    );

    const walletAddress = await contract.loginUser(email, password);
    return walletAddress;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};