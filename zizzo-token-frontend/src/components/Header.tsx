import { useWallet } from "@/context/WalletContext";

export default function Header() {
  const { address, isConnected, connect, disconnect } = useWallet();
  console.log("the address", address);

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">Z</span>
          </div>
          <h1 className="text-lg font-bold text-brand-cream">ZizzoToken</h1>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-muted-foreground hidden sm:inline">
              {address!.slice(0, 6)}...{address!.slice(-4)}
            </span>
            <button
              onClick={disconnect}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connect}
            className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}
