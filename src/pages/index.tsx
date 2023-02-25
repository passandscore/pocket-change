import { Container } from "@mantine/core";
import { Inputs } from "@/components/Inputs";
import { TokenModal } from "@/components/TokenModal";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { networkData } from "@/networkData";
import { LoadingState } from "@/data-schema/enums";

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
  error?: string;
}

export default function Home() {
  const [openTokenModal, setOpenTokenModal] = useState(false);
  const [isConnectedWallet, setIsConnectedWallet] = useState(false);
  const [loadingState, setLoadingState] = useState(LoadingState.NONE);
  const [loadedSuccessfully, setLoadedSuccessfully] = useState(false);
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

  const loadAllBalances = useCallback(async () => {
    const promises = networkData.map(async (network) => {
      try {
        const balance = await (
          await fetch(
            `https://deep-index.moralis.io/api/v2/${address}/balance?chain=${network.id}`,
            { headers }
          )
        ).json();

        const tokenPrice = await (
          await fetch(
            `https://deep-index.moralis.io/api/v2/erc20/${network.wrappedTokenAddress}/price?chain=${network.id}`,
            { headers }
          )
        ).json();

        if (balance.message) {
          return { error: balance.message };
        }

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

  const resetLoadingState = useCallback(() => {
    setTimeout(() => {
      setLoadingState(LoadingState.NONE);
    }, 1000);
  }, []);

  const handleSubmit = async (inputRef: any) => {
    // check if address is valid
    const addressInput = inputRef.current.value;
    if (!ethers.utils.isAddress(addressInput)) {
      // set error state
      setLoadingState(LoadingState.ERROR);
      showNotification({
        title: "Error",
        message: "Invalid address",
        color: "red",
        icon: <IconX />,
      });

      resetLoadingState();
      return;
    }

    const balances = (await loadAllBalances()) as BalanceDetails[];

    if (balances.some((balance) => balance.error)) {
      setLoadedSuccessfully(false);
      setLoadingState(LoadingState.ERROR);
      resetLoadingState();

      showNotification({
        title: "Error",
        message: balances[0].error,
        color: "red",
        icon: <IconX />,
      });
      return;
    }
    setBalanceDetails(balances);
    setLoadedSuccessfully(true);
  };

  const OnModalClose = () => {
    setOpenTokenModal(false);
    setBalanceDetails([]);
    setIsConnectedWallet(false);
    setLoadedSuccessfully(false);
  };

  useEffect(() => {
    if (loadedSuccessfully && loadingState === LoadingState.LOADED) {
      setTimeout(() => {
        setOpenTokenModal(true);
        setLoadingState(LoadingState.NONE);
      }, 500);
    }
  }, [loadedSuccessfully, loadingState, setOpenTokenModal]);

  return (
    <>
      <TokenModal
        openTokenModal={openTokenModal}
        balanceDetails={balanceDetails}
        address={address}
        OnModalClose={OnModalClose}
      />
      <Container size="sm">
        <Inputs
          address={address}
          setIsConnectedWallet={setIsConnectedWallet}
          isConnectedWallet={isConnectedWallet}
          handleSubmit={handleSubmit}
          setLoadingState={setLoadingState}
          loadingState={loadingState}
        />
      </Container>
    </>
  );
}
