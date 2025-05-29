import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import {
  currentPeriod,
  getDragonBalance,
  getlock,
  getLpTokenBalance,
  getPartner,
  getPartners,
  getVotingPower,
  userVotes,
} from "../../contract_interactions/contract-reads";
import { unixToNumeric } from "../time-helper/time-helper";
import useAuthentication from "./useAuthentication";
import useVoting from "./useVoting";

function useBalances() {
  const { wallets } = useWallets();
  const isLoggedIn: any = useAuthentication();
  const { state } = useVoting();
  const [balances, setBalances] = useState<any | null>(null);

  useEffect(() => {
    if (wallets[0]) {
      findBalances();
    }
  }, [wallets]);

  useEffect(() => {}, [balances]);

  async function findBalances() {
    try {
      if (!wallets || wallets.length === 0) return;
      const period_info = await getVotingPartners();
      const address = wallets[0]?.address;
      const dragon: any = await getDragonBalance(address);
      const lp: any = await getLpTokenBalance(address);
      const votingPower: any = await getVotingPower(address);
      const lockInfo: any = await getlock(address);
      const info = await getUserVoteInfo(period_info, wallets);
      const tempDate: any = lockInfo[1];
      lockInfo[1] = unixToNumeric(tempDate);
      //lock amount index zero is lock amount , index 1 is lock time shows full date
      setBalances({
        tokens: [
          {
            balance: dragon,
            logo: "/src/assets/logo_new.png",
            name: "Dragon",
            surname: "DRAGON",
          },
          {
            balance: lp,
            name: "Dragon LP",
            surname: "DLP",
            logo: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38.png",
          },
        ],
        votingPower: {
          balance: votingPower,
        },
        votes: info,
        lockInfo,
        pools: null,
      });
    } catch (error) {}
  }

  async function getVotingPartners() {
    const partners: any = await getPartners();
    const period: any = await currentPeriod();
    return { partners, period };
  }
  // async function getVotingPartners() {
  //   const currentVotingPartners: any = await getPartners();
  //   return currentVotingPartners
  // }

  async function getUserVoteInfo(period_info: any, wallets: any) {
    const { partners, period }: any = period_info;
    if (partners && wallets[0]) {
      const votes = [];
      for (let i = 0; i < partners.length; i++) {
        const current: any = partners[i];
        if (current) {
          const _partnerId = current[current.length - 2];
          const partner_info = await getPartner(_partnerId);

          const vote = await userVotes(period, wallets[0].address, _partnerId);
          const output: any = await findVotes(partner_info, vote);
          if (output) {
            votes.push(output);
          }
        }
      }
      return votes;
    }
    return null;
  }

  async function findVotes(partnerInfo: any, vote: any) {
    if (parseInt(vote) > 0) {
      return {
        votes: vote,
        address: partnerInfo[0],
        name: partnerInfo[1],
      };
    }
    return null;
  }

  return balances;
}

export default useBalances;
// use alert button more useful
