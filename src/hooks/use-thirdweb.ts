import { useCallback } from "react";
import {
  useActiveAccount,
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useAutoConnect,
  useConnectModal,
  useWalletDetailsModal,
} from "thirdweb/react";
import { createThirdwebClient, defineChain } from "thirdweb";
import {
  baseSepolia as baseSepoliaThirdweb,
  base as baseThirdweb,
  hardhat,
  type Chain as ThirdwebChain,
} from "thirdweb/chains";

/**
 * Thirdweb client initialization using the provided client ID from the environment variables.
 */
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
export const thirdwebClient = createThirdwebClient({
  clientId,
});

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

/**
 * Shared wallet config for connect modals and auto connect.
 */
const WALLET_CONFIG = {
  chain,
  size: "compact",
};

/**
 * useThirdweb - Custom hook to access Thirdweb wallet/account utilities.
 */
export function useThirdweb() {
  // Auto connect status and loading state.
  const {
    isLoading: isAutoConnectLoading,
    isSuccess: isAutoConnectSuccess,
  } = useAutoConnect({
    ...WALLET_CONFIG,
    client: thirdwebClient,
    onTimeout: () => console.error("Wallet connection timeout"),
  });

  // Active wallet and account information.
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const connectionStatus = useActiveWalletConnectionStatus();

  // Wallet modal controls
  const { connect: _connect } = useConnectModal();
  const { open: _openDetailsModal } = useWalletDetailsModal();

  /**
   * Opens wallet details modal.
   */
  const openDetailsModal = useCallback(() => {
    _openDetailsModal({
      client: thirdwebClient,
    });
  }, [_openDetailsModal]);

  /**
   * Connects the wallet using the connect modal.
   */
  const connect = useCallback(async () => {
    try {
      const connectedWallet = await _connect({
        ...WALLET_CONFIG,
        client: thirdwebClient,
        size: "compact",
      });

      const walletAddress = connectedWallet.getAccount()?.address;
      console.log("Wallet connected", walletAddress);
    } catch (error) {
      console.error("Error connecting wallet", error);
    }
  }, [_connect]);

  /**
   * Disconnect the active wallet, if any.
   */
  const disconnect = useCallback(async () => {
    if (!wallet) {
      console.error("Wallet not connected");
      return;
    }
    try {
      await wallet.disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet", error);
    }
  }, [wallet]);

  // Hook return value exposes relevant wallet and connection props/functions.
  return {
    account,
    wallet,
    connectionStatus,
    isAutoConnectLoading,
    isAutoConnectSuccess,
    openDetailsModal,
    connect,
    disconnect,
  };
}
