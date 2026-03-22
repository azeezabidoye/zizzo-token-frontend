import { toast } from "sonner";
import { useAppKitAccount } from "@reown/appkit/react";
import { ethers } from "ethers";
import { useWriteContract } from "./specific/useWrite";

export const useMint = () => {
  const { getMint } = useWriteContract();
  const { address } = useAppKitAccount();

  const mint = async (to: string, amount: number): Promise<boolean> => {
    if (!address) {
      toast.error("Wallet Not Connected");
      return false;
    }

    const toastId = toast.loading("Minting...");

    try {
      // Convert amount to wei (1 token = 10^18 wei)
      const amountInWei = ethers.parseEther(amount.toString());

      const result = await getMint(to, amountInWei);

      if (!result.success) {
        toast.error(`Minting Failed: ${result.error}`, {
          id: toastId,
        });
        return false;
      } else {
        toast.success("Minting Successful", {
          id: toastId,
        });
        return true;
      }
    } catch (error) {
      toast.error(
        `Invalid amount: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        {
          id: toastId,
        }
      );
      return false;
    }
  };

  return { mint };
};
