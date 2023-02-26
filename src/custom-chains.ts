import { Chain } from "wagmi/chains";

export const cronos: Chain = {
  id: 25,
  name: "Cronos",
  network: "cronos",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos",
    symbol: "CRONOS",
  },
  rpcUrls: {
    default: {
      http: ["https://cronos-rpc.crypto.org"],
    },
    public: {
      http: ["https://cronos-rpc.crypto.org"],
    },
  },
  blockExplorers: {
    default: { name: "CronosScan", url: "https://cronos.crypto.org/" },
    etherscan: { name: "CronosScan", url: "https://cronos.crypto.org/" },
  },
  testnet: false,
};
