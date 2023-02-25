import { createStyles, TextInput, Switch, Flex, Box } from "@mantine/core";
import { useEffect, useRef } from "react";
import { SubmitButton } from "@/components/SubmitButton";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export function Inputs({
  address,
  setIsConnectedWallet,
  isConnectedWallet,
  handleSubmit,
}: {
  address: any;
  setIsConnectedWallet: (arg0: boolean) => void;
  isConnectedWallet: boolean;
  handleSubmit: (arg0: any) => Promise<void>;
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
      <Box mt={300} style={{ backgroundColor: "transparent !important" }}>
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
        <SubmitButton handleSubmit={() => handleSubmit(inputRef)} />
      </Flex>
    </>
  );
}
