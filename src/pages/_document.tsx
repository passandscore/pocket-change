import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const background = {
  backgroundImage: `url('/images/pocketchange-bg-trans.png')`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "100vw",
  height: "100vh",
};

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html style={{ ...background }}>
        <Head />
        <body style={{ backgroundColor: "transparent" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
