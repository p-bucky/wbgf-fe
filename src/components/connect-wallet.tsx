import { useState } from "react";
import { useThirdweb } from "../hooks";

export const ConnectWallet = () => {
  const { account, connectionStatus, connect, disconnect } = useThirdweb();
  const [copied, setCopied] = useState(false);

  const isConnected = connectionStatus === "connected" && account?.address;

  const copyAddress = async () => {
    if (account?.address) {
      await navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[2px] rounded-2xl opacity-70 group-hover:opacity-100 transition-all duration-500 blur-sm"
        style={{
          background: "linear-gradient(135deg, #f472b6, #ec4899, #db2777, #ec4899, #f472b6)",
          backgroundSize: "300% 300%",
          animation: "gradient-shift 4s ease infinite",
        }}
      />

      {/* Card */}
      <div className="relative bg-gradient-to-br from-pink-950/95 via-rose-950/90 to-pink-950/95 backdrop-blur-2xl rounded-2xl border border-pink-300/10 shadow-2xl overflow-hidden">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/15 via-transparent to-rose-500/10 pointer-events-none" />

        {isConnected ? (
          <div className="relative px-5 py-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-400" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping opacity-75" />
                </div>
                <span className="text-pink-400 text-xs font-semibold uppercase tracking-wider">Connected</span>
              </div>
              <button
                onClick={disconnect}
                className="text-white/40 hover:text-pink-400 transition-all duration-300 hover:scale-110 p-1.5 hover:bg-pink-500/10 rounded-lg"
                title="Disconnect"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>

            {/* Address display */}
            <div
              onClick={copyAddress}
              className="group/address cursor-pointer bg-black/30 hover:bg-black/40 rounded-xl px-4 py-3 border border-pink-500/10 hover:border-pink-500/30 transition-all duration-300"
            >
              <p
                className="text-[11px] font-mono text-white/80 tracking-wide break-all leading-relaxed group-hover/address:text-white transition-colors"
                style={{ wordBreak: "break-all" }}
              >
                {account.address}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-white/40 group-hover/address:text-pink-400 transition-colors">
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-pink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[10px] font-medium text-pink-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span className="text-[10px] font-medium">Click to copy</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={connect}
            disabled={connectionStatus === "connecting"}
            className="relative w-full px-6 py-4 flex items-center justify-center gap-3 text-white font-semibold transition-all duration-300 disabled:opacity-60 group/btn"
          >
            {connectionStatus === "connecting" ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-white/80">Connecting...</span>
              </>
            ) : (
              <>
                <div className="p-2 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl group-hover/btn:from-pink-500/30 group-hover/btn:to-rose-500/30 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M22 10h-6a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h6" />
                    <circle cx="18" cy="12" r="1" />
                  </svg>
                </div>
                <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
                  Connect Wallet
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};