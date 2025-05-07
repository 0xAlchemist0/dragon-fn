import { useWallets } from "@privy-io/react-auth";
import { useEffect, useMemo, useReducer } from "react";
import { numericToUnix } from "../time-helper/time-helper";
import {
  createVeLock,
  extendLockTime,
  increaseLockAmount,
} from "../../contract_interactions/contract-writes";
import useWalletInfo from "./useWalletInfo";
import { calculateVotingPower } from "../../contract_interactions/contract-reads";
import { assert } from "console";
const initialState = getInitialState();
export function useSandBox() {
  const { provider, account }: any = useWalletInfo();
  //dispatch updates lockstae is the state
  //has to always be state and reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const { lockTime, tokenAmount } = state;
    if (lockTime > 0) {
      lockTimeHandler();
    }
    if (tokenAmount > 0) {
      votingPowerHandler();
    }
  }, [state.lockTime, state.tokenAmount]);

  useEffect(() => {
    const { isReady } = state;
    if (isReady && provider && account) {
      handleTxEvent();
    }
  }, [state.isReady]);

  function reducer(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
      case "set":
        return { ...state, ...payload };

      default:
        return null;
    }
  }

  function lockTimeHandler() {
    const { lockTime } = state;
    console.log(state.lockTime);
    // const formattedTime = numericToUnix(lockTime);
    // console.log(formattedTime);
    // dispatch({ type: "set", payload: { lockTime: formattedTime } });
  }

  async function votingPowerHandler() {
    const { tokenAmount, lockTime } = state;
    const votingPower = await calculateVotingPower(tokenAmount, lockTime);
    dispatch({ type: "set", payload: { votingPower } });
    return null;
  }

  function txTrigger() {
    dispatch({ type: "set", payload: { load: true } });
  }

  function handleTxEvent() {
    const { type }: any = state;
    switch (type) {
      case "Lock":
        lockLp();
        break;
      case "Increase":
        increaseLock();
        break;
      case "Extend":
        extendTime();
        break;
    }
  }

  async function lockLp() {
    const { tokenAmount, lockTime }: any = state;
    console.assert(lockTime, {
      value: lockTime,
      message: "Value error",
    });
    txTrigger();

    const txResult = await createVeLock(
      tokenAmount,
      lockTime,
      provider,
      account
    );
    dispatch({
      type: "set",
      payload: { txMessage: txResult, txComplete: true, load: false },
    });
  }

  async function increaseLock() {
    const { tokenAmount }: any = state;
    txTrigger();

    const txResult = await increaseLockAmount(tokenAmount, provider, account);
    dispatch({
      type: "set",
      payload: { txMessage: txResult, load: false, txComplete: true },
    });
  }

  async function extendTime() {
    const { lockTime } = state;

    txTrigger();
    const txResult = await extendLockTime(lockTime, provider, account);
    dispatch({
      type: "set",
      payload: { txMessage: txResult, load: false, txComplete: true },
    });
  }
  return { state, dispatch };
}
// only  pass in action when you call dispatcher

function getInitialState() {
  return {
    lockTime: 1778116339,
    tokenAmount: 3000,
    votingPower: 0,
    isReady: false,
    approve: 0,
    wasApproved: false,
    txComplete: false,
    poolSelected: null,
    handleTXEvent: 0,
    txMessage: null,
    load: false,
    type: "Extend",
  };
}

//stat, useMemo, useContext
