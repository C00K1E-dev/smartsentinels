/**
 * Example usage of Civic Auth Web3 wallet integration
 * This file demonstrates how to use the wallet in other components
 */

"use client";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { useAccount, useBalance, useSendTransaction, useSignMessage } from "wagmi";
import { useState } from "react";

export const WalletExample = () => {
  const userContext = useUser();
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { sendTransaction } = useSendTransaction();
  const { signMessage } = useSignMessage();
  const [message, setMessage] = useState("");

  // Example: Send a transaction
  const handleSendTransaction = () => {
    if (address) {
      sendTransaction({
        to: "0x...", // recipient address
        value: BigInt(1000000000000000), // 0.001 ETH in wei
      });
    }
  };

  // Example: Sign a message
  const handleSignMessage = () => {
    if (message) {
      signMessage({ message });
    }
  };

  return (
    <div>
      {userContext.user && userHasWallet(userContext) && (
        <>
          <p>Wallet Address: {userContext.ethereum.address}</p>
          <p>Connected: {isConnected ? "Yes" : "No"}</p>
          <p>Balance: {balance ? `${balance.formatted} ${balance.symbol}` : "Loading..."}</p>
          
          <button onClick={handleSendTransaction}>
            Send Test Transaction
          </button>
          
          <input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message to sign"
          />
          <button onClick={handleSignMessage}>
            Sign Message
          </button>
        </>
      )}
    </div>
  );
};
