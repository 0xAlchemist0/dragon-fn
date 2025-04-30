import { readContract } from "viem/actions";
import { writeContract } from "viem/actions";
import { client } from "../config/viem_config.ts";
import { lotto_abi } from "../config/lotto_abi";
import { contracts } from "./contracts/contracts";
import { ve69_ABI } from "../config/ve69-ABI";
import { DragonPartnerRegistryABI } from "../config/DragonPartnerRegistryABI.ts";
import { LPTokenABI } from "../config/LPTokenABI.ts";
import { ve69LPFeeDistributor } from "../config/ve69LPFeeDistributorABI.ts";
import { ve69LPPoolVotingABI } from "../config/ve69LPPoolVotingABI.ts";
import { DragonTokenABI } from "../config/DragonTokenABI.ts";
const main_lotto_ca = "0x4Ad7107F4C638c01ad4eAD39d035626F05727e41";

import { formatUnits } from "viem";
const jackpot_manager_ca = "";

export async function get_game_config() {
  const data: any = await client.readContract({
    address: main_lotto_ca,
    abi: lotto_abi,
    functionName: "gameConfig",
  });
  console.log(data);

  return {
    minEntryAmount: Number(BigInt(data[0])) / 1e18,
    maxEntryAmount: Number(BigInt(data[1])) / 1e18,
    baseChance: Number(data[2]),
    maxChance: Number(data[3]),
    tokensPerPercent: Number(BigInt(data[4])) / 1e18,
    minJackpotPercent: Number(data[5]),
    maxJackpotPercent: Number(data[6]),
    minJackpotThreshold: Number(BigInt(data[7])) / 1e18,
    useUDistribuitom: Boolean(data[8]),
    active: Boolean(data[9]),

    // #more parameters go here look at https://sonicscan.org/address/0x4ad7107f4c638c01ad4ead39d035626f05727e41#readContract
  };
}
////

function verifyBalance(
  token_address: string,
  wallet_address: string,
  amount_to_use: number
) {}
///

export async function verifyApproval(owner: string, spender: string) {
  const allowance: any = await client.readContract({
    address: contracts.lpToken,
    args: [owner, spender],
    functionName: "allowance",
    abi: LPTokenABI,
  });
  console.log("Allowance: ", allowance);

  if (allowance > 0) {
    return true;
  }
  return false;
}

export async function getPoolBalance(
  token_address: any,
  wallet_address: string
) {
  const balance = await client.readContract({
    address: token_address,
    abi: LPTokenABI,
    functionName: "balanceOf",
    args: [wallet_address],
  });
  return balance;
}

///

// Calculate voting power based on amount and lock time:
//the balanceOf read function also give us the voting power
//unlock time must be in unix format
// Math.floor(Date.now() / 1000) timestamp format
export async function calculateVotingPower(amount: number, unlockTime: Number) {
  console.log(amount, unlockTime);
  try {
    const voting_power: any = await client.readContract({
      address: "0x69fA10882A252A79eE57E2a246D552BA630fd955",
      abi: ve69_ABI,
      functionName: "calculateVotingPower",
      args: [amount, unlockTime],
    });
    console.log("Voting Power:", voting_power);

    return voting_power;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//ve69LP uses this
export async function getVotingPower(address: string) {
  const voting_power = await client.readContract({
    address: contracts.ve69LP,
    abi: ve69_ABI,
    functionName: "balanceOf",
    args: [address],
  });
  return voting_power;
}

//checks to see the info on a users lock
export async function locked(address: string) {
  const lock_info = await client.readContract({
    address: contracts.ve69LP,
    abi: ve69_ABI,
    functionName: "locked",
    args: [address],
  });

  return lock_info;
}

export async function getCurrentEpochInfo() {
  const epoch: any = await client.readContract({
    address: contracts.ve69LPFeeDistributor,
    abi: ve69LPFeeDistributor,
    functionName: "getCurrentEpochInfo",
  });
  console.log(epoch);
  //index info: 0 currentEpoch rn, 1 start time of the next epoch, 2 the time left till the next epoch
  return epoch;
}

//gets the total amount of votes all users have important for showing which percentage has vted for what
export async function getVotesSupply() {
  const total_votes = client.readContract({
    address: contracts.ve69LP,
    abi: ve69_ABI,
    functionName: "totalVotingPower",
  });
  return total_votes;
}

//gets the current period of voting important value
export async function currentPeriod() {
  const current_period = await client.readContract({
    address: contracts.ve69LPPoolVoting,
    abi: ve69LPPoolVotingABI,
    functionName: "currentPeriod",
  });
  console.log(`voting Period: ${current_period}`);
  return currentPeriod;
}

export async function getDragonBalance(wallet: any) {
  const balance: any = await client.readContract({
    address: contracts.dragon,
    abi: DragonTokenABI,
    functionName: "balanceOf",
    args: [wallet],
  });

  return formatUnits(balance, 18) || null;
}
export async function getLpTokenBalance(wallet: any) {
  const balance: any = await client.readContract({
    address: contracts.lpToken,
    abi: LPTokenABI,
    functionName: "balanceOf",
    args: [wallet],
  });
  return formatUnits(balance, 18) || null;
}

//gets full lock details
export async function getlock(_user: any) {
  const lock_info: any = await client.readContract({
    address: contracts.ve69LP,
    abi: ve69_ABI,
    functionName: "getLock",
    args: [_user],
  });
  return lock_info;
}

//loop through index of the mapping for partenrs
//second to last index is the id
//the final index is how much votes they have
export async function getPartners() {
  const partners = [];
  const length: any = await getNextPartnerId();
  const period = await currentPeriod();
  for (let i = 1; i <= length - 1; i++) {
    const current_partner: any = await client.readContract({
      address: contracts.DragonPartnerRegistry,
      abi: DragonPartnerRegistryABI,
      functionName: "getPartner",
      args: [i.toString()],
    });
    const current_partner_votes: any = await getPartnerVotes(
      period.toString(),
      i.toString()
    );
    current_partner.push(i);
    current_partner.push(current_partner_votes);
    console.log(current_partner);
    partners.push(current_partner);
    return partners;
  }
}

//here we can tell the length of the partners
async function getNextPartnerId() {
  const nextId: any = await client.readContract({
    address: contracts.DragonPartnerRegistry,
    abi: DragonPartnerRegistryABI,
    functionName: "nextPartnerId",
  });
  return parseInt(nextId);
}

async function getPartnerVotes(period: any, partnerId: string) {
  try {
    const votes = await client.readContract({
      address: contracts.ve69LPPoolVoting,
      abi: ve69LPPoolVotingABI,
      functionName: "partnerVotes",
      args: [period, partnerId],
    });
    return votes;
  } catch (error) {
    console.log(error);
  }
}

export async function jackpotsWon(address: string) {
  return null;
}

// https://github.com/wenakita/srd/blob/main/client%2Fsrc%2Fcomponents%2FProbabilityGameEntry.tsx
