import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const ConnectWallet = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]); // Guarda la dirección de la cuenta
        setError(null); // Reinicia el error
        console.log("Connected account:", accounts[0]);
      } catch (err) {
        setError("Connection rejected"); // Manejo de errores
        console.error("Error connecting to wallet:", err);
      }
    } else {
      setError("Please install MetaMask!");
      console.error("MetaMask not installed");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleConnectWallet}
        startIcon={<AccountBalanceWalletIcon />}
      >
        Connect Wallet
      </Button>
      {account && <Typography variant="body1">Connected: {account}</Typography>}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
};
