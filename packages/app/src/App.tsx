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
          <div>Hello</div>
          <ConnectButton />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
