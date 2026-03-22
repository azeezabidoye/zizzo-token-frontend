import { useTokenContract } from "../useContract";
import { BigNumberish } from "ethers";

export const useReadContract = () => {
  const tokenContract = useTokenContract();

  const getSymbol = async () => {
    const symbol = await tokenContract.symbol();
    return symbol;
  };

  const getName = async () => {
    const name = await tokenContract.name();
    return name;
  };

  const getTotalSupply = async () => {
    const totalSupply = await tokenContract.totalSupply();
    return totalSupply;
  };

  const getMaxSupply = async () => {
    const maxSupply = await tokenContract.MAX_SUPPLY();
    return maxSupply;
  };

  const getOwner = async () => {
    const owner = await tokenContract.owner();
    return owner;
  };

  const getBalance = async (address: string) => {
    const balance = await tokenContract.balanceOf(address);
    return balance;
  };

  const getFaucetAmount = async () => {
    const amount = await tokenContract.FAUCET_AMOUNT();
    return amount;
  };

  const getFaucetCooldown = async () => {
    const cooldown = await tokenContract.FAUCET_COOLDOWN();
    return cooldown;
  };

  const getLastRequestTime = async (address: string) => {
    const time = await tokenContract.lastRequestTime(address);
    return time;
  };

  return { 
    getSymbol, 
    getName, 
    getTotalSupply, 
    getMaxSupply, 
    getOwner,
    getBalance,
    getFaucetAmount,
    getFaucetCooldown,
    getLastRequestTime
  };
};
