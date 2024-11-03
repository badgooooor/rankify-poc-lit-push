import { LIT_RPC } from "@lit-protocol/constants";
import { ethers } from "ethers";

export const litEtherSigner = new ethers.Wallet(
  import.meta.env.VITE_LIT_SIGNER_PRIVATE_KEY,
  new ethers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
);

export const pushEtherSigner = new ethers.Wallet(
  import.meta.env.VITE_LIT_SIGNER_PRIVATE_KEY,
);
