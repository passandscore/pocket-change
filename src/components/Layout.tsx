import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CustomConnectButton } from "@/components/CustomConnectButton";
import Image from "next/image";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export function Layout({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Header
        height={HEADER_HEIGHT}
        sx={{
          borderBottom: 0,
          position: "fixed",
          width: "100%",
          backgroundColor: "transparent",
        }}
        mb={120}
        mt={20}
      >
        <Container className={classes.inner} fluid>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
            {/* <MantineLogo size={28} /> */}
            <Image
              src="/images/pocketchange-logo.png"
              alt="Find My NFT Logo"
              width={375}
              height={75}
            />
          </Group>

          <Box mr={10}>
            <CustomConnectButton />
          </Box>
        </Container>
      </Header>
      {children}
    </>
  );
}
