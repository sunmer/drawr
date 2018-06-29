export interface IMotif {
  id: string;
  name: string;
  price: string;
  isPurchased: boolean;
}

export interface IWeb3 {
  balance: number,
  coinbase: string,
  currentProvider: object,
  accounts: string[]
}
