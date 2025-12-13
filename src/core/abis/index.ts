import { erc20Abi } from "./erc20";
import { biddingAbi } from "./bidding";

export const ABIS = {
  ERC20: erc20Abi,
  BIDDING: biddingAbi,
} as const;
