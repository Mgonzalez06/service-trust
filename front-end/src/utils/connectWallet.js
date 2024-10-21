import { ethers } from "ethers";

export async function connectWallet(connected, setConnected, setWalletAddress) {
  if (!connected) {
    // Connect the wallet using ethers.js
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const _walletAddress = await signer.getAddress();
    setConnected(true);
    setWalletAddress(_walletAddress);
  } else {
    const newWallet = createNewWallet();
    // Disconnect the wallet
    setConnected(true);
    setWalletAddress(newWallet.address);
  }
}

export function createNewWallet() {
  const wallet = ethers.Wallet.createRandom();

  const address = wallet.address;
  const privateKey = wallet.privateKey;

  console.log("Nueva wallet creada");
  console.log("Dirección pública:", address);
  console.log("Clave privada (¡mantener en secreto!):", privateKey);

  return wallet;
}
