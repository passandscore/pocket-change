import { Container, Flex } from "@mantine/core";
import { Inputs } from "@/components/Inputs";
import { SubmitButton } from "@/components/SubmitButton";
import { TokenModal } from "@/components/TokenModal";
import { useEffect, useState } from "react";
import axios from "axios";

interface BalanceDetails {
  network: string;
  balance: number;
  tokenPrice: {
    exchangeAddress: string;
    exchangeName: string;
    nativePrice: {
      decimals: number;
      name: string;
      symbol: string;
      value: number;
    };
    usdPrice: number;
  };
}

export default function Home() {
  const [openTokenModal, setOpenTokenModal] = useState(false);
  const [address, setAddress] = useState(
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  );
  const [balanceDetails, setBalanceDetails] = useState([
    {
      network: "",
      balance: 0,
      tokenPrice: {},
    } as BalanceDetails,
  ]);

  const web3ApiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const headers = { accept: "application/json", "X-API-Key": web3ApiKey! };
  const networkData = [
    {
      name: "Ethereum",
      id: "0x1",
      wrappedTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    {
      name: "Polygon",
      id: "0x89",
      wrappedTokenAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    },
    {
      name: "Binance",
      id: "0x38",
      wrappedTokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    },
    {
      name: "Avalanche",
      id: "0xa86a",
      wrappedTokenAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
    },
    {
      name: "Fantom",
      id: "0xfa",
      wrappedTokenAddress: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    },
    {
      name: "Cronos",
      id: "0x19",
      wrappedTokenAddress: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
    },
  ];

  const loadAllBalances = async () => {
    networkData.forEach(async (network) => {
      try {
        const balance = await (
          await fetch(
            "https://deep-index.moralis.io/api/v2/" +
              address +
              "/balance?chain=" +
              network.id,
            { headers }
          )
        ).json();
        const tokenPrice = await (
          await fetch(
            "https://deep-index.moralis.io/api/v2/erc20/" +
              network.wrappedTokenAddress +
              "/price?chain=" +
              network.id,
            { headers }
          )
        ).json();

        const result = {
          network: network.name,
          balance: balance.balance / 1e18,
          tokenPrice,
        };
        setBalanceDetails((prev) => [...prev, result]);

        console.log("network: ", network.name);
        console.log("balance: ", balance.balance / 1e18);

        console.log("tokenPrice", tokenPrice);
        setOpenTokenModal(true);
        // console.log(
        //   " Network Name - " +
        //     network.name +
        //     " Wallet Balance - " +
        //     balance.balance / 1e18 +
        //     " Token Price - $" +
        //     tokenPrice.usdPrice.toLocaleString() +
        //     "/" +
        //     tokenPrice.nativePrice.symbol +
        //     ""
        // );
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <>
      <TokenModal
        openTokenModal={openTokenModal}
        setOpenTokenModal={setOpenTokenModal}
        balanceDetails={balanceDetails}
        address={address}
      />
      <Container size="sm">
        <Inputs />
        <Flex justify="right" pt={20}>
          <SubmitButton loadAllBalances={loadAllBalances} />
        </Flex>
      </Container>
    </>
  );
}
