import { useState } from "react";
import { useWallet } from "@/context/WalletContext";

interface Props {
  onMint: (to: string, amount: string) => Promise<string>;
}

export default function MintForm({ onMint }: Props) {
  const { isConnected } = useWallet();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const msg = await onMint(to, amount);
      setStatus({ type: "success", msg });
      setTo("");
      setAmount("");
    } catch (err: any) {
      setStatus({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-5 shadow-sm border border-border animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      <h3 className="font-semibold text-brand-cream mb-3">Mint Tokens</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Recipient address (0x...)"
          value={to}
          onChange={e => setTo(e.target.value)}
          disabled={!isConnected}
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          disabled={!isConnected}
          min="0"
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!isConnected || loading}
          className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Minting..." : "Mint"}
        </button>
      </form>
      {!isConnected && <p className="text-xs text-muted-foreground mt-2">Connect your wallet to mint tokens</p>}
      {status && (
        <p className={`text-sm mt-2 ${status.type === "success" ? "text-green-400" : "text-destructive"}`}>
          {status.msg}
        </p>
      )}
    </div>
  );
}
