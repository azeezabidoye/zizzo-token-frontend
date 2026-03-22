import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface WalletContextType {
  address: string | null;

  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

const MOCK_ADDRESSES = [
  "0xAbC1234567890DEF1234567890abcDEF12345678",
  "0x9876FeDcBa0987654321FeDcBa09876543210000",
];

export function WalletProvider({ children }: { children: ReactNode }) {
  // const [address, setAddress] = useState<string | null>(null);
  // const [balance, setBalance] = useState("0");
  const { address } = useAppKitAccount();

  const { open } = useAppKit();

  const connect = useCallback(() => {
    // const addr = MOCK_ADDRESSES[Math.floor(Math.random() * MOCK_ADDRESSES.length)];

    open();

    // console.log("hhh", address);

    // setAddress(addr);
    // setBalance("1000");
  }, []);

  const disconnect = useCallback(() => {
    // setAddress(null);
    open();
  }, []);

  return (
    <WalletContext.Provider
      value={{ address, isConnected: !!address, connect, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be inside WalletProvider");
  return ctx;
}
