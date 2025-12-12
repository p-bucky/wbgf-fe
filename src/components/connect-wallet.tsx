import { useThirdweb } from "../hooks";

export const ConnectWallet = () => {
  const { account, connectionStatus, connect, disconnect } = useThirdweb();

  const isConnected = connectionStatus === "connected" && account?.address;

  return (
    <div>
      {isConnected ? (
        <div>
          <p>{account.address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connect} disabled={connectionStatus === "connecting"}>
          {connectionStatus === "connecting" ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};