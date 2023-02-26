import { createStyles, Header, Container, Group, Box } from "@mantine/core";
import { CustomConnectButton } from "@/components/CustomConnectButton";
import Image from "next/image";
import { SocialsMenu } from "@/components/Socials/SocialsMenu";
import { useViewportSize } from "@mantine/hooks";
import { BREAKPOINT } from "@/constants";

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
  const { width } = useViewportSize();

  return (
    <Box
      style={{
        maxWidth: 1000,
        minWidth: 375,
        margin: "0 auto",
      }}
    >
      <Header
        height={HEADER_HEIGHT}
        sx={{
          borderBottom: 0,
          width: "100%",
          backgroundColor: "transparent",
        }}
        mb={120}
        mt={20}
      >
        <Container className={classes.inner} fluid>
          {width > BREAKPOINT ? (
            <Image
              src="/images/pocketchange-logo.png"
              alt="Pocket Change Logo"
              width={375}
              height={75}
            />
          ) : (
            <Image
              src="/images/pocketchange-logo-sm.png"
              alt="Pocket Change Logo"
              width={125}
              height={75}
            />
          )}

          <Box mr={10}>
            <CustomConnectButton />
          </Box>
        </Container>
      </Header>
      {children}
      {width > BREAKPOINT && <SocialsMenu />}
    </Box>
  );
}
