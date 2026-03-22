// import type { TokenData } from "@/hooks/useContract";

import { useReadContract } from "@/hooks/specific/useRead";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

// interface Props {
//   data: TokenData;
// }

export default function TokenInfo() {
  const [name, setName] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string | null>(null);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [maxSupply, setMaxSupply] = useState<number>(0);
  const [owner, setOwner] = useState<string>(null);

  const { getSymbol, getName, getTotalSupply, getMaxSupply, getOwner } =
    useReadContract();

  useEffect(() => {
    // getSymbol
    const getTokenSymbol = async () => {
      const symbol = await getSymbol();
      setSymbol(symbol);
    };

    // getName
    const getTokenName = async () => {
      const name = await getName();
      setName(name);
    };

    // get Total Supply
    const getTotalSupplyFn = async () => {
      const totalSupply = await getTotalSupply();
      setTotalSupply(totalSupply);
    };

    // get Max Supply
    const getMaxSupplyFn = async () => {
      const maxSupply = await getMaxSupply();

      setMaxSupply(maxSupply);
    };

    const getOwnerFn = async () => {
      const owner = await getOwner();

      setOwner(owner);
    };

    getTokenName();
    getTokenSymbol();
    getTotalSupplyFn();
    getMaxSupplyFn();
    getOwnerFn();
  }, []);

  const items = [
    { label: "Token Name", value: name },
    { label: "Symbol", value: symbol },
    {
      label: "Total Supply",
      value: `${ethers.formatEther(totalSupply)} ${symbol}`,
    },
    {
      label: "Max Supply",
      value: `${ethers.formatEther(maxSupply)} ${symbol}`,
    },
    { label: "Contract Owner", value: `${owner}`, mono: true },
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
            className="bg-card rounded-lg p-4 shadow-sm border border-border"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              {item.label}
            </p>
            <p
              className={`font-medium text-foreground ${
                item.mono ? "font-mono text-sm break-all" : ""
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
