import {
  baseSepolia as baseSepoliaThirdweb,
  base as baseThirdweb,
  defineChain,
  hardhat,
  type Chain as ThirdwebChain,
} from "thirdweb/chains";

/**
 * Helper to derive the chain configuration from environment variables.
 * Throws if unsupported chain is supplied.
 */
const getChain = (): { thirdweb: ThirdwebChain } => {
  const chainId = import.meta.env.VITE_CHAIN;
  switch (chainId) {
    case "baseSepolia":
      return { thirdweb: baseSepoliaThirdweb };
    case "base":
      return { thirdweb: baseThirdweb };
    case "hardhat":
      return {
        thirdweb: { ...hardhat, rpc: "http://localhost:8545/", id: 1337 },
      };
    default:
      throw new Error(
        `Unsupported chain ID: ${chainId} please check your .env file`
      );
  }
};

// Extract the appropriate chain config from helper.
const { thirdweb: thirdwebChain } = getChain();

/**
 * Defines the current chain using Thirdweb's defineChain factory.
 * RPC, currency, and block explorer configs are all sourced from env vars.
 */
export const chain = defineChain({
  id: thirdwebChain.id,
  rpc: import.meta.env.VITE_HTTP_RPC_URL,
  nativeCurrency: thirdwebChain.nativeCurrency,
  testnet: thirdwebChain.testnet,
  blockExplorers: thirdwebChain.blockExplorers,
});

export { thirdwebChain };
