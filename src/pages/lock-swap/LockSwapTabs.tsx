import { useContext } from "react";
import { LockContext } from "../../context-providers/LockProvider";
import LockSwapModal from "./LockSwapModal";

function LockSwapTabs() {
  const { state, dispatch }: any = useContext(LockContext);

  const { type }: any = state;

  const handleLock = () => {
    type == "Lock"
      ? null
      : dispatch({ type: "set", payload: { type: "Lock" } });
  };

  const handleIncrease = () => {
    type == "Increase"
      ? null
      : dispatch({ type: "set", payload: { type: "Increase" } });
  };
  const handleExtend = () => {
    type == "Extend"
      ? null
      : dispatch({ type: "set", payload: { type: "Extend" } });
  };

  return (
    <div className="w-120">
      <div
        className="grid grid-cols-3 w-[100%] text-[14px] font-bold rounded-md  m-auto whitespace-nowrap p-2"
        style={{ color: "#B0B3BA" }}
      >
        <button
          className="border-[#4C5C68] bg-[#1B1C20] hover:bg-[#232428] p-1.5 rounded-l-md"
          onClick={handleLock}
        >
          Lock
        </button>
        <button
          className="border-[#4C5C68] bg-[#1B1C20] hover:bg-[#232428] p-1.5"
          onClick={handleIncrease}
        >
          Increase{" "}
        </button>
        <button
          className="border-[#4C5C68] bg-[#1B1C20] hover:bg-[#232428] p-1.5 rounded-r-md"
          onClick={handleExtend}
        >
          Extend{" "}
        </button>
      </div>
      <div className="mt-3 p-2 w-full ">
        {type && <LockSwapModal type={state.type} />}
      </div>
    </div>
  );
}

export default LockSwapTabs;
