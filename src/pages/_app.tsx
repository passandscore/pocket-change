import React, { useEffect, useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { WagmiConfig, createClient } from "wagmi";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, mainnet, goerli } from "@wagmi/core";
import { fantom, polygon, avalanche, bsc } from "wagmi/chains";
import { Layout } from "@/components/Layout";
import "@rainbow-me/rainbowkit/styles.css";
import { NotificationsProvider } from "@mantine/notifications";
import { cronos } from "@/custom-chains";

const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;

/**
 * @dev Creates a contract instance through the wallet provider to write to the blockchain.
 *
 * This provider to only available after the user has connected their wallet.
 */
const { chains, provider } = configureChains(
  [mainnet, goerli, avalanche, polygon, bsc, fantom, cronos],
  [
    infuraProvider({ apiKey: infuraApiKey } as {
      apiKey: string;
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Pocket Change",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    const storedTheme = localStorage.getItem("colorScheme");
    if (storedTheme) {
      setColorScheme(storedTheme as ColorScheme);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Pocket Change</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "#fdda0d",
            accentColorForeground: "black",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              theme={{ colorScheme }}
              withGlobalStyles
              withNormalizeCSS
            >
              <NotificationsProvider autoClose={false} position="bottom-left">
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
