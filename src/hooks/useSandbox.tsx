import { useEffect, useReducer } from "react";
import { calculateVotingPower } from "../../contract_interactions/contract-reads";
import {
  createVeLock,
  extendLockTime,
  increaseLockAmount,
} from "../../contract_interactions/contract-writes";
import { convert, unixToNumeric } from "../time-helper/time-helper";
import useWalletInfo from "./useWalletInfo";
const initialState = getInitialState();
export function useSandBox() {
  const { provider, account }: any = useWalletInfo();
  //dispatch updates lockstae is the state
  //has to always b e state and reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {}, [state.poolSelected]);

  //the 7 day lock is wrong because transaction fails when you try it

  useEffect(() => {
    const { lockTime, tokenAmount } = state;
    if (lockTime > 0 && tokenAmount > 0) {
      votingPowerHandler();
    } else if (lockTime > 0) {
    }
  }, [state.lockTime]);

  useEffect(() => {}, [state.lockTime]);

  // useEffect(() => {
  //   const { tokenAmount, lockTime } = state;
  //   if (tokenAmount > 0 && lockTime > 0) {
  //     votingPowerHandler();
  //   }
  // }, [state.tokenAmount]);

  useEffect(() => {
    const { isReady } = state;
    if (isReady && provider && account) {
      handleTxEvent();
    }
  }, [state.isReady]);

  useEffect(() => {}, [state]);

  //this handles the state change we pass in the type of action and we pass in the value we want to update for example:
  //dispatch({ type: "set", payload: { type: "Extend" } });

  function reducer(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
      case "set":
        return { ...state, ...payload };

      default:
        return null;
    }
  }

  //handles the lock times when changed

  //state is semi delayed find a way to fix
  async function votingPowerHandler() {
    const { tokenAmount, lockTime } = state;
    const time = await convert(lockTime);
    const dateFormat = await unixToNumeric(time);
    console.log(`Date locked: ${dateFormat}`);
    const votingPower = await calculateVotingPower(tokenAmount, time);
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
    const unix: any = convert(lockTime);
    console.assert(lockTime, {
      value: lockTime,
      message: "Value error",
    });
    txTrigger();
    const txResult = await createVeLock(tokenAmount, unix, provider, account);
    dispatch({
      type: "set",
      payload: { txMessage: txResult, load: false, txComplete: true },
    });
    suspendTxOperation();
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
  function suspendTxOperation() {
    dispatch({
      type: "set",
      payload: {
        isReady: false,
        load: false,
      },
    });
  }

  return { state, dispatch };
}
// only  pass in action when you call dispatcher

function getInitialState() {
  return {
    lockTime: 0,
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
    type: "Lock",
    unixLockTime: null,
  };
}

// lockTime,
// tokenAmount,
// votingPower,
// isReady,
// approve,
// wasApproved,
// txComplete,
// poolSelected,
// handleTXEvent,
// txMessage,
// load,

//stat, useMemo, useContext
