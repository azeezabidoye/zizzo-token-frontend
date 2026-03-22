import { useAppKitAccount } from "@reown/appkit/react";
import { useTokenContract } from "../useContract";
import { useCallback } from "react";
import { BigNumberish } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";

import { toast } from "react-toastify";

const errorDecoder = ErrorDecoder.create();

export const useWriteContract = () => {
  const tokenContract = useTokenContract(true);
  const { address } = useAppKitAccount();

  const getTransfer = useCallback(
    async (
      to: string,
      amount: BigNumberish,
    ): Promise<{ success: boolean; error?: string }> => {
      if (!address) {
        toast.error("Wallet Not Connected");
        return { success: false, error: "Wallet Not Connected" };
      }
      if (!tokenContract) {
        toast.error("Contract not Found");
        return { success: false, error: "Contract not Found" };
      }

      console.log("the address from write", address);

      try {
        const tranferTx = await tokenContract.transfer(to, amount);

        const receipt = await tranferTx.wait();
        console.log("receipt", tranferTx);

        console.log("dddd", receipt.status === 1);

        return { success: receipt.status === 1 };
      } catch (error) {
        const decodedError = await errorDecoder.decode(error);
        console.log(decodedError);

        toast.error(decodedError.reason);
        return {
          success: false,
          error: decodedError.reason || "Unknown error",
        };
      }
    },
    [tokenContract, address],
  );

  return { getTransfer };
};
