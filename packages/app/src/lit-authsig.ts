import { LIT_RPC, LitNetwork } from "@lit-protocol/constants";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import * as ethers from "ethers";
import { createSiweMessage, generateAuthSig, LitAbility, LitAccessControlConditionResource } from "@lit-protocol/auth-helpers";
import { defineChain } from "viem";

export const chronicleYellowstone = defineChain({
  id: 175188,
  name: 'Chronicle Yellowstone',
  nativeCurrency: { name: 'tstLPX', symbol: 'tstLPX', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://yellowstone-rpc.litprotocol.com/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://yellowstone-explorer.litprotocol.com/',
      apiUrl: 'https://yellowstone-explorer.litprotocol.com/api'
    },
  },
})
const ethersSigner = new ethers.Wallet(
  import.meta.env.VITE_LIT_SIGNER_PRIVATE_KEY,
  new ethers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
);

const litNodeClient = new LitNodeClient({
  litNetwork: LitNetwork.DatilDev,
  debug: false,
  alertWhenUnauthorized: true, // you can skip this, but this can be helpful during development
});

export const getSessionSigsViaAuthSig = async () => {
  try {
    console.log("🔄 Connecting LitNodeClient to Lit network...");
    await litNodeClient.connect();
    console.log("✅ Connected LitNodeClient to Lit network");

    console.log("🔄 Connecting LitContracts client to network...");
    const litContracts = new LitContracts({
      randomPrivatekey: true,
      network: LitNetwork.DatilDev,
      debug: true,
    });
    await litContracts.connect();
    console.log("✅ Connected LitContracts client to network");

    console.log("🔄 Creating capacityDelegationAuthSig...");
    const { capacityDelegationAuthSig } =
      await litNodeClient.createCapacityDelegationAuthSig({
        dAppOwnerWallet: ethersSigner,
        delegateeAddresses: [ethersSigner.address],
        uses: "1",
      });
    console.log(`✅ Created the capacityDelegationAuthSig`);

    console.log("🔄 Getting Session Sigs via an Auth Sig...");
    const sessionSignatures = await litNodeClient.getSessionSigs({
      chain: "ethereum",
      expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
      capabilityAuthSigs: [capacityDelegationAuthSig],
      resourceAbilityRequests: [
        {
          resource: new LitAccessControlConditionResource("*"),
          ability: LitAbility.AccessControlConditionDecryption,
        },
      ],
      authNeededCallback: async ({
        uri,
        expiration,
        resourceAbilityRequests,
      }) => {
        const toSign = await createSiweMessage({
          uri,
          expiration,
          resources: resourceAbilityRequests,
          walletAddress: await ethersSigner.getAddress(),
          nonce: await litNodeClient.getLatestBlockhash(),
          litNodeClient,
        });

        return await generateAuthSig({
          signer: ethersSigner,
          toSign,
        });
      },
    });
    console.log("✅ Got Session Sigs via an Auth Sig");
    return sessionSignatures;
  } catch (error) {
    console.error(error);
  } finally {
    litNodeClient.disconnect();
  }
};