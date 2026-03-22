import { useAppKitAccount } from "@reown/appkit/react";
import { useTokenContract } from "../useContract";
import { useCallback } from "react";
import { BigNumberish } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";

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
        return { success: false, error: "Wallet Not Connected" };
      }
      if (!tokenContract) {
        return { success: false, error: "Contract not Found" };
      }

      try {
        const transferTx = await tokenContract.transfer(to, amount);
        const receipt = await transferTx.wait();
        return { success: receipt.status === 1 };
      } catch (error) {
        const decodedError = await errorDecoder.decode(error);
        return {
          success: false,
          error: decodedError.reason || "Unknown error",
        };
      }
    },
    [tokenContract, address],
  );

  const getMint = useCallback(
    async (
      to: string,
      amount: BigNumberish,
    ): Promise<{ success: boolean; error?: string }> => {
      if (!address) {
        return { success: false, error: "Wallet Not Connected" };
      }
      if (!tokenContract) {
        return { success: false, error: "Contract not Found" };
      }

      try {
        const mintTx = await tokenContract.mint(to, amount);
        const receipt = await mintTx.wait();
        return { success: receipt.status === 1 };
      } catch (error) {
        const decodedError = await errorDecoder.decode(error);
        return {
          success: false,
          error: decodedError.reason || "Unknown error",
        };
      }
    },
    [tokenContract, address],
  );

  const getRequestToken = useCallback(
    async (): Promise<{ success: boolean; error?: string }> => {
      if (!address) {
        return { success: false, error: "Wallet Not Connected" };
      }
      if (!tokenContract) {
        return { success: false, error: "Contract not Found" };
      }

      try {
        const requestTx = await tokenContract.requestToken();
        const receipt = await requestTx.wait();
        return { success: receipt.status === 1 };
      } catch (error) {
        const decodedError = await errorDecoder.decode(error);
        return {
          success: false,
          error: decodedError.reason || "Unknown error",
        };
      }
    },
    [tokenContract, address],
  );

  return { getTransfer, getMint, getRequestToken };
};
