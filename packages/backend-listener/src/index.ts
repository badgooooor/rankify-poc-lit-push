import { CONSTANTS, type NotificationEvent } from "@pushprotocol/restapi";
import type { PushStream } from "@pushprotocol/restapi/src/lib/pushstream/PushStream";
import { litNodeClient, pushWalletUser } from "./instances";
import { getSessionSigsViaAuthSig } from "./lit-authsig";
import { checkAndSignAuthMessage, decryptToString } from "@lit-protocol/lit-node-client";
import { LIT_CHAINS } from "@lit-protocol/constants";
import { execute } from "./lit-action";

const accessControlConditions = [
  {
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
    method: "eth_getBalance",
    parameters: [":userAddress", "latest"],
    returnValueTest: {
      comparator: ">=",
      value: "1000000000000", // 0.000001 ETH
    },
  },
];

// Initialize stuff.
const sessionSigs = await getSessionSigsViaAuthSig();
console.log('signatures', sessionSigs);

const notificationHandler = async (data: NotificationEvent) => {
  await litNodeClient.connect();

  // const authSig = await checkAndSignAuthMessage({ chain: 'ethereum', nonce: await litNodeClient.getLatestBlockhash() });

  // const decryptedMessage = await decryptToString({
  //   authSig,
  //   ciphertext: data.message.notification.body,
  //   dataToEncryptHash: "",
  //   chain: 'ethereum',
  //   accessControlConditions
  // }, litNodeClient);

  console.log('decrypted message', data);

  const response = await execute(14, sessionSigs);
  console.log('response from action: ', response);

  await litNodeClient.disconnect();
}

const subscribeStream = async () => {
    let stream: PushStream;

    const initializeStream = async () => {
        try {
            stream = await pushWalletUser.initStream([CONSTANTS.STREAM.NOTIF]);
  
            stream.on(CONSTANTS.STREAM.NOTIF, notificationHandler);
  
            stream.connect();
        } catch (error) {
            console.error("Error initializing notification stream:", error);
        }
      };
  
      initializeStream();
}


subscribeStream();
