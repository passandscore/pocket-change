import { createStyles, TextInput, Switch, Flex, Box } from "@mantine/core";

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

export function Inputs() {
  const { classes } = useStyles();

  return (
    <Box mt={300} style={{ backgroundColor: "transparent !important" }}>
      <Flex direction="row-reverse" mb={20}>
        <Switch
          labelPosition="left"
          label="Use Connected Wallet"
          color="green"
        />
      </Flex>
      <Box>
        <TextInput
          label="Provide a wallet address"
          placeholder="0x..."
          defaultValue="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
          classNames={classes}
        />
      </Box>
    </Box>
  );
}
