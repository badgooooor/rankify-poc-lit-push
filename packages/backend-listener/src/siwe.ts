import { ethers } from "ethers";
import { SiweMessage } from "siwe";

export const createAuthSig = async (wallet: ethers.Wallet) => {
  const domain = "localhost";
  const origin = "https://localhost";
  const statement = "Message for Lit Protocol authentication";
  
  const siweMessage = new SiweMessage({
    domain,
    address: wallet.address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1, // Ethereum mainnet
    nonce: ethers.utils.randomBytes(32).toString(),
    issuedAt: new Date().toISOString(),
    expirationTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
  });

  const messageToSign = siweMessage.prepareMessage();
  const signature = await wallet.signMessage(messageToSign);
  
  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: wallet.address,
  };

  return authSig;
};