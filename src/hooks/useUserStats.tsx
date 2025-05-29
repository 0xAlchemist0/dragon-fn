import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import {
  getPoolBalance,
  getVotingPower,
  locked,
} from "../../contract_interactions/contract-reads";
import { contracts } from "../../contract_interactions/contracts/contracts";

export function useUserStats() {
  const { wallets } = useWallets();
  const [userStats, setStats] = useState<object | null>({});

  useEffect(() => {
    async function getStats(address: string) {
      console.log(`Adress: ${address}`);
      const user_stats: object = await stats(address);
      setStats(user_stats);
      return user_stats;
    }
    if (wallets[0]) {
      getStats(wallets[0].address);
    }
  }, [wallets]);

  useEffect(() => {
    console.log(`Stats updated:`, userStats);
  }, [userStats]);

  return userStats;
}

async function stats(address: string) {
  const votingPower = await getVotingPower(address);
  const lock_info: any = await locked(address);
  const lp_balance = await getPoolBalance(contracts.lpToken, address);
  const formatted_balance = uintToStandard(lp_balance);
  const vote_amount = 1;
  return {
    votingPower,
    tokens_locked: lock_info[0] || null,
    lp_balance: formatted_balance,
    vote_amount,
  };
}

async function getBalancesPools() {
  return null;
}

function uintToStandard(value: any) {
  return Number(formatUnits(BigInt(value), 18)).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
