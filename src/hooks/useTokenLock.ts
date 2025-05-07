import { useEffect, useState } from "react";
import { useWallets } from "@privy-io/react-auth"; // adjust if different

import { numericToUnix } from "../time-helper/time-helper";
import {
  calculateVotingPower,
  getCurrentEpochInfo,
} from "../../contract_interactions/contract-reads";
import {
  createVeLock,
  extendLockTime,
  increaseLockAmount,
} from "../../contract_interactions/contract-writes.ts";
import { verifyApproval } from "../../contract_interactions/contract-reads";
import { approveSending } from "../../contract_interactions/contract-writes.ts";
import { contracts } from "../../contract_interactions/contracts/contracts";
import { LPTokenABI } from "../../config/LPTokenABI";

export function useTokenLock(type: string) {
  const { wallets } = useWallets();
  const [lockTime, setLockTime] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [votingPower, setVotingPower] = useState(0);
  const [isReady, setReady] = useState(false);
  const [approve, setApprove] = useState(true);
  const [wasApproved, setWasApproved] = useState(false);
  const [txComplete, setTxComplete] = useState(false);
  const [txMessage, setTxMessage] = useState();
  const [poolSelected, setPoolSelected] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (approve) {
      approveTokens();
    }
  }, [approve]);
  null;

  // useEffect(() => {
  //   if (isReady && tokenAmount > 0 && lockTime > 0) {
  //     lockLP();
  //   }
  // }, [isReady, lockTime, isReady]);
  useEffect(() => {
    handleTXEvent();
  }, [isReady]);

  useEffect(() => {
    console.log("info");
    console.log(tokenAmount, lockTime);

    if (lockTime > 0 && tokenAmount > 0) {
      if (type == "lock") {
        getVotingPower();
      }
    }
  }, [lockTime, tokenAmount]);

  function handleTXEvent() {
    switch (type) {
      case "Lock":
        lockLP();
        break;

      case "Increase":
        increaseLock();
        break;
      case "Extend":
        extendTime();
        break;
    }
  }

  async function lockLP() {
    const epoch = await getCurrentEpochInfo();
    const unix_time = numericToUnix(lockTime);

    console.log("lock time: ", unix_time);
    const provider = await wallets[0]?.getEthereumProvider();
    const account = await provider.request({ method: "eth_requestAccounts" });
    setLoad(true);

    const lock_status: any = await createVeLock(
      tokenAmount,
      unix_time,
      provider,
      account[0]
    );
    setLoad(false);

    setTxMessage(lock_status);
    setTxComplete(true);
  }

  async function approveTokens() {
    const provider = await wallets[0]?.getEthereumProvider();
    const account = await provider.request({ method: "eth_requestAccounts" });

    const isApproved = await verifyApproval(
      wallets[0].address,
      contracts.ve69LP
    );
    setWasApproved(isApproved);

    if (!isApproved) {
      const approval_request = await approveSending(
        contracts.lpToken,
        contracts.ve69LP,
        LPTokenABI,
        provider,
        account[0]
      );
      setWasApproved(approval_request);
    }
  }

  async function increaseLock() {
    const { provider, account }: any = await getProvider();
    setLoad(true);

    const increase_result: any = await increaseLockAmount(
      tokenAmount,
      provider,
      account[0] || null
    );
    setTxMessage(increase_result);
    setLoad(false);

    setTxComplete(true);
  }

  async function getProvider() {
    const provider = await wallets[0]?.getEthereumProvider();
    const account = await provider.request({ method: "eth_requestAccounts" });
    return { provider, account };
  }

  async function extendTime() {
    const { provider, account }: any = await getProvider();
    const unlock_time = numericToUnix(lockTime);
    console.log(`unlock time: ${unlock_time}, type: ${typeof unlock_time}`);
    setLoad(true);
    const extendResult: any = await extendLockTime(
      unlock_time,
      provider,
      account[0]
    );
    setTxMessage(extendResult);
    setLoad(false);

    setTxComplete(true);
  }

  async function getVotingPower() {
    const unix_time = numericToUnix(lockTime);
    const power = await calculateVotingPower(tokenAmount, unix_time);
    console.log("power", power);
    setVotingPower(power);
  }

  return {
    lockTime,
    setLockTime,
    tokenAmount,
    setTokenAmount,
    votingPower,
    isReady,
    setReady,
    approve,
    setApprove,
    wasApproved,
    txComplete,
    setTxComplete,
    poolSelected,
    setPoolSelected,
    handleTXEvent,
    txMessage,
    load,
    setLoad,
  };
}

//keep in mind ides for easyness
// const [state, setState] = useState({
//   lockTime: 0,
//   tokenAmount: 0,
//   votingPower: undefined,
//   isReady: false,
//   approve: true,
//   wasApproved: false,
//   txComplete: {
//     completed: false,
//     message: null,
//   },
//   poolSelected: null,
// });
