import { CONSTANTS, PushAPI, type NotificationEvent } from "@pushprotocol/restapi";
import type { PushStream } from "@pushprotocol/restapi/src/lib/pushstream/PushStream";
import { ethers } from "ethers";

const pushEtherSigner = new ethers.Wallet(
  Bun.env.SIGNER_PRIVATE_KEY,
);

const pushWalletUser = await PushAPI.initialize(pushEtherSigner, {
    env: CONSTANTS.ENV.STAGING,
  });
  
console.log('initialized push wallet user: ', pushWalletUser.account);

const subscribeStream = async () => {
    let stream: PushStream;

    const initializeStream = async () => {
        try {
            stream = await pushWalletUser.initStream([CONSTANTS.STREAM.NOTIF]);
  
            stream.on(CONSTANTS.STREAM.NOTIF, (data: NotificationEvent) => {
                console.log("New notification:", data);
            });
  
            stream.connect();
        } catch (error) {
            console.error("Error initializing notification stream:", error);
        }
      };
  
      initializeStream();
}

subscribeStream();