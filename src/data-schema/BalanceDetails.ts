export type BalanceDetails = {
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
};
