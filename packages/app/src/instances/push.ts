import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";
import { pushEtherSigner } from "./signer";

export const pushWalletUser = await PushAPI.initialize(pushEtherSigner, {
  env: CONSTANTS.ENV.STAGING,
});
