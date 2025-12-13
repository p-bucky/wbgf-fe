import { useCallback } from "react";
import {
  useActiveAccount,
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useAutoConnect,
  useConnectModal,
  useWalletDetailsModal,
} from "thirdweb/react";
import { chain, thirdwebClient } from "../thirdweb";

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
