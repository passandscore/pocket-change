import { createStyles, TextInput, Switch, Flex, Box } from "@mantine/core";
import { useEffect, useRef } from "react";

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
  addressInput,
  setAddressInput,
  setIsConnectedWallet,
  isConnectedWallet,
}: {
  address: any;
  addressInput: string;
  setAddressInput: any;
  setIsConnectedWallet: (arg0: boolean) => void;
  isConnectedWallet: boolean;
}) {
  const { classes } = useStyles();

  const useConnectedWallet = () => {
    setIsConnectedWallet(!isConnectedWallet);
  };

  useEffect(() => {
    if (isConnectedWallet) {
      setAddressInput(address!) as unknown as `0x${string}`;
    } else {
      setAddressInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnectedWallet]);

  return (
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
          label="Provide a wallet address"
          placeholder="0x..."
          defaultValue="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
          classNames={classes}
          value={addressInput}
          onChange={(e) => setAddressInput(e.currentTarget.value)}
        />
      </Box>
    </Box>
  );
}
