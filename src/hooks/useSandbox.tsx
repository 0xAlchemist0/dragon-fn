import { useWallets } from "@privy-io/react-auth";
import { Reducer, ReducerState, useReducer } from "react";
import { numericToUnix } from "../time-helper/time-helper";
import { createVeLock } from "../../contract_interactions/contract-writes";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "set":
      return { ...state, action.payload };
      break;

    default:
      return null;
      break;
  }
}

export function useSandBox() {
  const { wallets } = useWallets();
  const provider: any = wallets[0] ? wallets[0].getEthereumProvider() : null;
  const account: any = wallets[0] ? wallets[0] : null;
  const initialState = getInitialState();
  //dispatch updates lockstae is the state
  //has to always be state and reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleTxEvent() {
    switch (state?.type) {
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
    const { lockState, tokenAmount, lockTime }: any = state;

    console.assert(lockTime, {
      value: lockTime,
      message: "Value error",
    });
    const unixTime: any = numericToUnix(lockTime);
    const lockResult = await createVeLock(
      tokenAmount,
      unixTime,
      provider,
      account
    );
    dispatch({ type: "set", payload:{ txMessage: lockResult,txComplete:true, load: false} });
  }

  async function increaseLock() {}

  async function extendTime() {}
  return { state, dispatch };
}
// only  pass in action when you call dispatcher

function getInitialState() {
  return {
    lockTime: 0,
    tokenAmount: 0,
    votingPower: 0,
    isReady: false,
    approve: 0,
    wasApproved: false,
    txComplete: false,
    poolSelected: null,
    handleTXEvent: 0,
    txMessage: null,
    load: false,
    type: "",
  };
}

//stat, useMemo, useContext
