import React from "react";
import useWalletInfo from "../hooks/useWalletInfo";
import { useSandBox } from "../hooks/useSandbox";

function Sandbox() {
  const { state, dispatch } = useSandBox();

  const handleTx = () => {
    if (state.isReady) {
      dispatch({ type: "set", payload: { isReady: false } });
    } else {
      dispatch({ type: "set", payload: { isReady: true } });
    }
  };

  return (
    <div>
      <button className="text-white" onClick={handleTx}>
        hello
      </button>
    </div>
  );
}

export default Sandbox;
