import { createStyles, TextInput, Switch, Flex, Box } from "@mantine/core";
import { useEffect, useRef } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { LoadingState } from "@/data-schema/enums";
import { useViewportSize } from "@mantine/hooks";
import { BREAKPOINT } from "@/constants";

export function Inputs({
  address,
  setIsConnectedWallet,
  isConnectedWallet,
  handleSubmit,
  setLoadingState,
  loadingState,
}: {
  address: any;
  setIsConnectedWallet: (arg0: boolean) => void;
  isConnectedWallet: boolean;
  handleSubmit: (arg0: any) => Promise<void>;
  setLoadingState: (arg0: LoadingState) => void;
  loadingState: LoadingState;
}) {
  const { width } = useViewportSize();

  const useStyles = createStyles((theme) => ({
    root: {
      position: "relative",
    },

    input: {
      height: "auto",
      paddingTop: 28,
      fontSize: `${
        width < BREAKPOINT ? theme.fontSizes.xs : theme.fontSizes.xl
      }px`,
      color: "transparent",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
      backgroundImage: "linear-gradient(45deg, #f9d80d, #fe7b17)",
      backgroundSize: "80% 80%",
      animation: "$gradient 15s ease infinite",
    },

    label: {
      position: "absolute",
      pointerEvents: "none",
      fontSize: theme.fontSizes.sm,
      paddingLeft: theme.spacing.md,
      paddingTop: theme.spacing.md / 2,
      zIndex: 1,
    },
  }));

  const { classes } = useStyles();

  const useConnectedWallet = () => {
    setIsConnectedWallet(!isConnectedWallet);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isConnectedWallet) {
      if (inputRef.current) {
        inputRef.current.value = address;
      }
    } else {
      if (inputRef.current) inputRef.current.value = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnectedWallet]);

  return (
    <>
      <Box
        style={{
          marginTop: `${width < BREAKPOINT ? "25vh" : "30vh"}`,
          paddingLeft: `${width < BREAKPOINT && "5px"}`,
          paddingRight: `${width < BREAKPOINT && "5px"}`,
          backgroundColor: "transparent !important",
        }}
      >
        <Flex direction="row-reverse" mb={20}>
          <Switch
            labelPosition="left"
            label="Use Connected Wallet"
            color="green"
            checked={isConnectedWallet}
            onChange={useConnectedWallet}
          />
        </Flex>
        <Box>
          <TextInput
            ref={inputRef}
            label="Provide a wallet address"
            placeholder="0x..."
            classNames={classes}
          />
        </Box>
      </Box>
      <Flex justify="right" pt={20}>
        <SubmitButton
          handleSubmit={() => handleSubmit(inputRef)}
          setLoadingState={setLoadingState}
          loadingState={loadingState}
        />
      </Flex>
    </>
  );
}
