import { useState, useCallback } from "react";
import { useWallet } from "@/context/WalletContext";
import Timer from "./Timer";

interface Props {
  onRequest: () => Promise<string>;
  cooldownMs: number;
  faucetAmount: string;
  symbol: string;
}

// Per-wallet cooldown storage (in-memory)
const cooldowns: Record<string, number> = {};

export default function Faucet({
  onRequest,
  cooldownMs,
  faucetAmount,
  symbol,
}: Props) {
  const { isConnected, address } = useWallet();
  const [status, setStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState(0);

  const cooldownEnd = address ? cooldowns[address] || 0 : 0;
  const isCooling = cooldownEnd > Date.now();

  const handleRequest = useCallback(async () => {
    if (!address) return;
    // if (cooldowns[address] && cooldowns[address] > Date.now()) {
    //   setStatus({
    //     type: "error",
    //     msg: "Please wait for the cooldown to finish",
    //   });
    //   return;
    // }
    // setStatus(null);
    // setLoading(true);
    // try {
    //   const msg = await onRequest();
    //   cooldowns[address] = Date.now() + cooldownMs;
    //   setStatus({ type: "success", msg });
    //   forceUpdate((n) => n + 1);
    // } catch (err: any) {
    //   setStatus({ type: "error", msg: err.message });
    // } finally {
    //   setLoading(false);
    // }
  }, [address, onRequest, cooldownMs]);

  return (
    <div
      className="bg-card rounded-lg p-5 shadow-sm border border-border animate-fade-in-up"
      style={{ animationDelay: "0.2s" }}
    >
      <h3 className="font-semibold text-brand-cream mb-1">Token Faucet</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Request {faucetAmount} {symbol} every 24 hours
      </p>

      {!isConnected ? (
        <p className="text-sm text-muted-foreground bg-muted rounded-md px-3 py-2">
          🔗 Connect your wallet to request tokens
        </p>
      ) : isCooling ? (
        <div className="space-y-2">
          <Timer targetTime={cooldownEnd} />
          <p className="text-xs text-muted-foreground">
            You've already claimed. Come back later!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {!cooldowns[address!] && (
            <p className="text-sm text-muted-foreground">
              🎉 You haven't requested tokens yet — go ahead!
            </p>
          )}
          <button
            onClick={handleRequest}
            disabled={loading}
            className="w-full px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
          >
            {loading ? "Requesting..." : `Request ${faucetAmount} ${symbol}`}
          </button>
        </div>
      )}

      {status && (
        <p
          className={`text-sm mt-3 ${
            status.type === "success" ? "text-green-400" : "text-destructive"
          }`}
        >
          {status.msg}
        </p>
      )}
    </div>
  );
}
