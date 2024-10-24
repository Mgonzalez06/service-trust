import { BrowserProvider, Wallet } from "ethers";

export async function connectWallet(connected, setConnected, setWalletAddress) {
  if (!connected) {
    // Verifica si MetaMask está instalada
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed.");
    }

    // Conectar la wallet usando ethers.js
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const _walletAddress = await signer.getAddress();
    setConnected(true);
    setWalletAddress(_walletAddress);
  } else {
    const newWallet = createNewWallet();
    setConnected(true);
    setWalletAddress(newWallet.address);
  }
}

export function createNewWallet() {
  const wallet = Wallet.createRandom();

  const address = wallet.address;
  const privateKey = wallet.privateKey;

  console.log("Nueva wallet creada");
  console.log("Dirección pública:", address);
  console.log("Clave privada (¡mantener en secreto!):", privateKey);

  return wallet;
}
