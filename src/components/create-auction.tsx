import { prepareContractCall, sendTransaction } from "thirdweb/transaction";
import { BIDDING_CONTRACT } from "../thirdweb/client";
import { useThirdweb } from "../hooks";
import { useReadContract } from "thirdweb/react";
import moment from "moment";

export const CreateAuction = () => {
  const { account } = useThirdweb();

  const createAuction = async () => {
    if (!account) return;

    const startTime = Math.floor(Date.now() / 1000);
    const endTime = startTime + 30 * 24 * 60 * 60;

    const transaction = prepareContractCall({
      contract: BIDDING_CONTRACT,
      method: "createAuction",
      params: [BigInt(startTime), BigInt(endTime)],
    });

    await sendTransaction({
      account: account,
      transaction,
    });
  };

  const { data: latestAuction } = useReadContract({
    contract: BIDDING_CONTRACT,
    method: "getLatestAuction",
    params: [],
  });

  return (
    <div>
      <button onClick={createAuction}>Create Auction</button>
      {latestAuction && (
        <div>
          <p>
            <strong>id:</strong> {latestAuction.id?.toString?.() ?? "0"}
          </p>
          <p>
            <strong>startTime:</strong>
            {latestAuction.startTime
              ? moment.unix(Number(latestAuction.startTime)).format("YYYY-MM-DD HH:mm:ss")
              : "N/A"}
          </p>
          <p>
            <strong>endTime:</strong>
            {latestAuction.endTime
              ? moment.unix(Number(latestAuction.endTime)).format("YYYY-MM-DD HH:mm:ss")
              : "N/A"}
          </p>
          <p>
            <strong>highestBid:</strong> {latestAuction.highestBid?.toString?.() ?? "0"}
          </p>
          <p>
            <strong>highestBidder:</strong> {latestAuction.highestBidder ?? "0x0000000000000000000000000000000000000000"}
          </p>
        </div>
      )}
    </div>
  );
};
