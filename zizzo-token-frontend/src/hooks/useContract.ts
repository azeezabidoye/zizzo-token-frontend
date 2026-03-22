import { useMemo } from "react";
import { Contract } from "ethers";
import { TOKEN_ABI } from "../ABI/token";
import { getAddress } from "ethers";
import useRunners from "./useRunners";

export const useTokenContract = (withSigner = false) => {
  const { readOnlyProvider, signer } = useRunners();

  // console.log("env", import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS);

  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null;
      return new Contract(
        getAddress(import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS),
        TOKEN_ABI,
        signer,
      );
    }
    return new Contract(
      getAddress(import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS),
      TOKEN_ABI,
      readOnlyProvider,
    );
  }, [readOnlyProvider, signer, withSigner]);
};
