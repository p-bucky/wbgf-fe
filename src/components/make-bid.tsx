import { useState } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb/transaction";
import { BIDDING_CONTRACT, ERC20_CONTRACT } from "../thirdweb/client";
import { useThirdweb } from "../hooks";

export const MakeBid = () => {
  const { account } = useThirdweb();
  const [auctionId, setAuctionId] = useState("0");
  const [bidAmount, setBidAmount] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const placeBid = async () => {
    if (!account) return;

    setIsLoading(true);
    try {
      // Parse amount with 6 decimals (USDC)
      const amount = BigInt(parseFloat(bidAmount) * 1_000_000);

      // Step 1: Approve token spending for bidding contract
      const approveTx = prepareContractCall({
        contract: ERC20_CONTRACT,
        method: "approve",
        params: [BIDDING_CONTRACT.address, amount],
      });

      await sendTransaction({
        account,
        transaction: approveTx,
      });

      // Step 2: Place the bid
      const bidTx = prepareContractCall({
        contract: BIDDING_CONTRACT,
        method: "placeBid",
        params: [BigInt(auctionId), amount],
      });

      await sendTransaction({
        account,
        transaction: bidTx,
      });

      console.log("Bid placed successfully!");
    } catch (error) {
      console.error("Error placing bid:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <label>
          Auction ID:
          <input
            type="number"
            value={auctionId}
            onChange={(e) => setAuctionId(e.target.value)}
            min="0"
          />
        </label>
      </div>
      <div>
        <label>
          Bid Amount (USDC):
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            min="0"
            step="0.000001"
          />
        </label>
      </div>
      <button onClick={placeBid} disabled={isLoading || !account}>
        {isLoading ? "Placing Bid..." : "Place Bid"}
      </button>
    </div>
  );
};
