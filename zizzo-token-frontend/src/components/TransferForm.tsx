import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { useTransfer } from "@/hooks/useTransfer";

export default function TransferForm() {
  const { isConnected } = useWallet();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const { transfer } = useTransfer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !amount) return;

    setLoading(true);
    const success = await transfer(to, Number(amount));
    
    if (success) {
      setTo("");
      setAmount("");
    }
    setLoading(false);
  };

  return (
    <div
      className="bg-card rounded-lg p-5 shadow-sm border border-border animate-fade-in-up"
      style={{ animationDelay: "0.15s" }}
    >
      <h3 className="font-semibold text-brand-cream mb-3">Transfer Tokens</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Recipient address (0x...)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          disabled={!isConnected || loading}
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!isConnected || loading}
          min="0"
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!isConnected || loading || !to || !amount}
          className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Transferring..." : "Transfer"}
        </button>
      </form>
      {!isConnected && (
        <p className="text-xs text-muted-foreground mt-2">
          Connect your wallet to transfer tokens
        </p>
      )}
    </div>
  );
}
