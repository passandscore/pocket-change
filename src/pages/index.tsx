import { Container, Flex } from "@mantine/core";
import { Inputs } from "@/components/Inputs";
import { SubmitButton } from "@/components/SubmitButton";
import { TokenModal } from "@/components/TokenModal";
import { useCallback, useState } from "react";
import { useAccount } from "wagmi";

//Todo: Check wallet validation. Show error if not valid
//Todo: Modal presentation
//Todo: change submit button states

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
  const [addressInput, setAddressInput] = useState("");
  const [isConnectedWallet, setIsConnectedWallet] = useState(false);
  const [balanceDetails, setBalanceDetails] = useState([
    {
      network: "",
      balance: 0,
      tokenPrice: {},
    } as BalanceDetails,
  ]);

  const { address } = useAccount();

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

  const loadAllBalances = useCallback(async () => {
    const promises = networkData.map(async (network) => {
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

        return {
          network: network.name,
          balance: balance.balance / 1e18,
          tokenPrice,
        };
      } catch (error) {
        console.error(error);
      }
    });

    return Promise.all(promises);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    const balances = (await loadAllBalances()) as BalanceDetails[];
    setBalanceDetails(balances);
    setOpenTokenModal(true);
  };

  const OnModalClose = () => {
    setOpenTokenModal(false);
    setBalanceDetails([]);
    setAddressInput("");
    setIsConnectedWallet(false);
  };

  return (
    <>
      <TokenModal
        openTokenModal={openTokenModal}
        setOpenTokenModal={setOpenTokenModal}
        balanceDetails={balanceDetails}
        address={address}
        OnModalClose={OnModalClose}
      />
      <Container size="sm">
        <Inputs
          address={address}
          addressInput={addressInput}
          setAddressInput={setAddressInput}
          setIsConnectedWallet={setIsConnectedWallet}
          isConnectedWallet={isConnectedWallet}
        />
        <Flex justify="right" pt={20}>
          <SubmitButton handleSubmit={handleSubmit} />
        </Flex>
      </Container>
    </>
  );
}
