import { useReadContract } from "thirdweb/react";
import { useThirdweb } from "../hooks";
import { ERC20_CONTRACT } from "../thirdweb";
import type { Address } from "thirdweb";
import { formatUnits } from "ethers";

export const ConnectWallet = () => {
  const { account, connectionStatus, connect, disconnect } = useThirdweb();

  const isConnected = connectionStatus === "connected" && account?.address;

  const {data: balance} = useReadContract({
    contract: ERC20_CONTRACT,
    method: "balanceOf",
    params: [account?.address as Address],
  });

  console.log(balance);

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
      {balance && <p>Balance USDC: {formatUnits(balance, 6)}</p>}
    </div>
  );
};
