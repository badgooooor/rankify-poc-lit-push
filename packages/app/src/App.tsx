import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import { useEffect } from "react";
import { chronicleYellowstone, getSessionSigsViaAuthSig } from "./lit-authsig";
import { SendPushNotificationInput } from "./components/SendPushNotificationInput";
import { useSubscribePushNotification } from "./hooks/useSubscribePushNotification";
import { RootLayout } from "./components/RootLayout";

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

  useSubscribePushNotification();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <RootLayout>
            <div className="flex flex-row gap-4 p-4">
              <SendPushNotificationInput />
            </div>
          </RootLayout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
