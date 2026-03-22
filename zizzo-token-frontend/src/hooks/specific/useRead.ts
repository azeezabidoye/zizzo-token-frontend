import { useTokenContract } from "../useContract";

export const useReadContract = () => {
  const tokenContract = useTokenContract();

  const getSymbol = async () => {
    const symbol = await tokenContract.symbol();
    return symbol;
  };

  //   get token name
  const getName = async () => {
    const name = await tokenContract.name();
    return name;
  };
  // get total supply
  const getTotalSupply = async () => {
    const totalSupply = await tokenContract.totalSupply();
    return totalSupply;
  };

  // get max supply
  const getMaxSupply = async () => {
    const maxSupply = await tokenContract.MAX_SUPPLY();
    return maxSupply;
  };

  // get Owner
  const getOwner = async () => {
    const owner = await tokenContract.owner();
    return owner;
  };

  return { getSymbol, getName, getTotalSupply, getMaxSupply, getOwner };
};
