import { LIT_RPC, LitNetwork } from "@lit-protocol/constants";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";
import { ethers } from "ethers";

export const pushEtherSigner = new ethers.Wallet(
  Bun.env.SIGNER_PRIVATE_KEY,
);

export const pushWalletUser = await PushAPI.initialize(pushEtherSigner, {
    env: CONSTANTS.ENV.STAGING,
  });

export const litNodeClient = new LitNodeClient({
  litNetwork: LitNetwork.DatilDev,
  debug: false,
  alertWhenUnauthorized: true, // you can skip this, but this can be helpful during development
});


export const litEtherSigner = new ethers.Wallet(
  Bun.env.SIGNER_PRIVATE_KEY,
  new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
);
