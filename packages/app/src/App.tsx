import "@rainbow-me/rainbowkit/styles.css";

import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./App.css";
import { useEffect } from "react";
import { chronicleYellowstone, getSessionSigsViaAuthSig } from "./lit-authsig";
import { SendPushNotificationInput } from "./component/SendPushNotificationInput";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia, chronicleYellowstone],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const createLitAuthSig = async () => {
      const sessionSignature = await getSessionSigsViaAuthSig();
      console.log("signature", sessionSignature);
    };

    createLitAuthSig();
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="p-4">Test POC</div>
          <ConnectButton />
          <div className="flex flex-row gap-4 p-4">
            <SendPushNotificationInput />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
