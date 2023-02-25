import { createStyles, TextInput, Switch, Flex, Box } from "@mantine/core";
import { useEffect, useRef } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { LoadingState } from "@/data-schema/enums";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 28,
    fontSize: theme.fontSizes.xl,
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
      <Box mt={250} style={{ backgroundColor: "transparent !important" }}>
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
