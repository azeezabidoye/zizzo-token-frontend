import { useReadContract } from "@/hooks/specific/useRead";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWallet } from "@/context/WalletContext";

export default function TokenInfo() {
  const [name, setName] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string | null>(null);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [maxSupply, setMaxSupply] = useState<number>(0);
  const [owner, setOwner] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");

  const { getSymbol, getName, getTotalSupply, getMaxSupply, getOwner, getBalance } =
    useReadContract();
  const { address } = useWallet();

  useEffect(() => {
    const getTokenSymbol = async () => {
      try {
        const symbol = await getSymbol();
        setSymbol(symbol);
      } catch (e) {}
    };

    const getTokenName = async () => {
      try {
        const name = await getName();
        setName(name);
      } catch (e) {}
    };

    const getTotalSupplyFn = async () => {
      try {
        const totalSupply = await getTotalSupply();
        setTotalSupply(totalSupply);
      } catch (e) {}
    };

    const getMaxSupplyFn = async () => {
      try {
        const maxSupply = await getMaxSupply();
        setMaxSupply(maxSupply);
      } catch (e) {}
    };

    const getOwnerFn = async () => {
      try {
        const owner = await getOwner();
        setOwner(owner);
      } catch (e) {}
    };

    getTokenName();
    getTokenSymbol();
    getTotalSupplyFn();
    getMaxSupplyFn();
    getOwnerFn();
  }, [getSymbol, getName, getTotalSupply, getMaxSupply, getOwner]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address) {
        setBalance("0");
        return;
      }
      try {
        const bal = await getBalance(address);
        setBalance(ethers.formatEther(bal));
      } catch (e) {
        setBalance("0");
      }
    };
    
    fetchBalance();
  }, [address, getBalance]);

  const items = [
    { label: "Token Name", value: name || "-" },
    { label: "Symbol", value: symbol || "-" },
    {
      label: "Total Supply",
      value: totalSupply ? `${ethers.formatEther(totalSupply)} ${symbol || ""}` : "-",
    },
    {
      label: "Max Supply",
      value: maxSupply ? `${ethers.formatEther(maxSupply)} ${symbol || ""}` : "-",
    },
    { label: "Contract Owner", value: owner || "-", mono: true },
    { 
      label: "Your Balance", 
      value: address ? `${balance} ${symbol || ""}` : "Connect Wallet",
      highlight: true
    },
  ];

  return (
    <section className="animate-fade-in-up">
      <h2 className="text-xl font-semibold text-brand-cream mb-4">
        Token Information
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`bg-card rounded-lg p-4 shadow-sm border border-border ${item.highlight ? 'ring-1 ring-primary/50 bg-primary/5' : ''}`}
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              {item.label}
            </p>
            <p
              className={`font-medium text-foreground ${
                item.mono ? "font-mono text-sm break-all" : ""
              } ${item.highlight && address ? "text-primary font-bold" : ""}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
