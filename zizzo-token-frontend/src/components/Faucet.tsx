import { useState, useCallback, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import Timer from "./Timer";
import { useReadContract } from "@/hooks/specific/useRead";
import { useFaucet } from "@/hooks/useFaucet";
import { ethers } from "ethers";

export default function Faucet() {
  const { isConnected, address } = useWallet();
  const [loading, setLoading] = useState(false);
  
  const [faucetAmount, setFaucetAmount] = useState("0");
  const [cooldownEnd, setCooldownEnd] = useState(0);
  const [symbol, setSymbol] = useState("");
  
  const { getFaucetAmount, getFaucetCooldown, getLastRequestTime, getSymbol } = useReadContract();
  const { requestToken } = useFaucet();

  const fetchFaucetData = useCallback(async () => {
    try {
      const sym = await getSymbol();
      setSymbol(sym);

      const amount = await getFaucetAmount();
      setFaucetAmount(ethers.formatEther(amount));

      if (address) {
        const lastTime = await getLastRequestTime(address);
        const cooldown = await getFaucetCooldown();
        
        const lastTimeMs = Number(lastTime) * 1000;
        const cooldownMs = Number(cooldown) * 1000;

        if (lastTimeMs > 0) {
          setCooldownEnd(lastTimeMs + cooldownMs);
        } else {
          setCooldownEnd(0);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [address, getSymbol, getFaucetAmount, getLastRequestTime, getFaucetCooldown]);

  useEffect(() => {
    fetchFaucetData();
  }, [fetchFaucetData]);

  const isCooling = cooldownEnd > Date.now();

  const handleRequest = async () => {
    if (!address) return;
    setLoading(true);
    const success = await requestToken();
    if (success) {
      await fetchFaucetData();
    }
    setLoading(false);
  };

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
          {cooldownEnd === 0 && (
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
    </div>
  );
}
