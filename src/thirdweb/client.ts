import { createThirdwebClient, getContract } from "thirdweb";
import { chain } from "./chain";
import { ABIS } from "../core/abis";

/**
 * Thirdweb client initialization using the provided client ID from the environment variables.
 */
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
export const thirdwebClient = createThirdwebClient({
  clientId,
});

export const ERC20_CONTRACT = getContract({
  client: thirdwebClient,
  address: import.meta.env.VITE_USDC_ADDRESS,
  chain: chain,
  abi: ABIS.ERC20,
});

export const BIDDING_CONTRACT = getContract({
  client: thirdwebClient,
  address: import.meta.env.VITE_BIDDING_CONTRACT,
  chain: chain,
  abi: ABIS.BIDDING,
});
 