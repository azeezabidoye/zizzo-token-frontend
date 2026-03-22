import { toast } from "sonner";
import { useAppKitAccount } from "@reown/appkit/react";
import { useWriteContract } from "./specific/useWrite";

export const useFaucet = () => {
  const { getRequestToken } = useWriteContract();
  const { address } = useAppKitAccount();

  const requestToken = async (): Promise<boolean> => {
    if (!address) {
      toast.error("Wallet Not Connected");
      return false;
    }

    const toastId = toast.loading("Requesting Tokens...");

    try {
      const result = await getRequestToken();

      if (!result.success) {
        toast.error(`Request Failed: ${result.error}`, {
          id: toastId,
        });
        return false;
      } else {
        toast.success("Tokens Requested Successfully!", {
          id: toastId,
        });
        return true;
      }
    } catch (error) {
      toast.error(
        `Unable to request: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        {
          id: toastId,
        }
      );
      return false;
    }
  };

  return { requestToken };
};
