import { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import { dragonPools } from "../../../config/dragonPools";
import lockswapContent from "../../../config/LockSwapContent";
import { contracts } from "../../../contract_interactions/contracts/contracts";
import { LockContext } from "../../context-providers/LockProvider";
import CalenderModal from "./CalenderModal";
import LPPairsModal from "./LPPairsModal";
import TxToaster from "./TxToaster";
//{ title, description, logo, token_name }
function LockSwapModal({ type }: any) {
  const { state, dispatch, userStats }: any = useContext(LockContext);
  // const {
  //   lockTime,
  //   setLockTime,
  //   tokenAmount,
  //   setTokenAmount,
  //   votingPower,
  //   isReady,
  //   setReady,
  //   approve,
  //   setApprove,
  //   wasApproved,
  //   txComplete,
  //   setTxComplete,
  //   poolSelected,
  //   setPoolSelected,
  //   handleTXEvent,
  //   txMessage,
  //   load,
  //   setLoad,
  // }: any = useTokenLock(type);
  const { btn } = lockswapContent[type];
  const [open, setOpen] = useState(false);
  const { logo1, logo2, name } = dragonPools[0];
  useEffect(() => {
    handleClose();
  }, [state.poolSelected]);

  const handleModalOpen = () => {};
  // dispatch({ type: "set", payload: { poolSelected: null } });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTxInitiation = () => {
    dispatch({ type: "set", payload: { load: true } });
    dispatch({ type: "set", payload: { isReady: true } });
  };

  return (
    <div className="flex justify-center">
      <div className="text-white sm:w-[95%] md:w-[100%] p-5 border border-[#2A2B30] bg-[#1E1F23] rounded-md">
        <h1 className="title text-2xl font-bold">
          {lockswapContent[type].title}{" "}
        </h1>
        {type !== "Extend" && (
          <div className="mt-2 p-3">
            <span className="text-xs flex justify-between mb-2 p-1">
              <h1>Amount</h1>
              <h1>Balance: {userStats.lp_balance}</h1>
            </span>
            <span className="grid grid-cols-2 border border-[#2A2B30] rounded-xl">
              <button
                onClick={() => {
                  handleModalOpen();
                  handleOpen();
                }}
                className=" p-1.5 border border-[#2A2B30] rounded-xl flex gap-2  border-r-0"
              >
                <div className="relative size-7">
                  <img
                    src={logo2}
                    className="w-full h-full rounded-full object-cover"
                  />

                  <div className="absolute bottom-1 left-[16px] rig top-[14px] size-[15.4px] rounded-xl border-2 border-[#4C5C68] bg-[#4C5C68] overflow-hidden">
                    <img
                      src={logo1}
                      alt="Badge"
                      className="w-full h-full object-cover bg-stone-500"
                    />
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-bold">
                  {state.poolSelected ? state.poolSelected.name : "DRAGON"}
                </h3>
              </button>
              <span className="border border-[#28292e] p-1.5 grid grid-flow-row text-xs">
                <input
                  type="tex"
                  placeholder="0"
                  className=" h-full outline-0"
                  onChange={(e) => {
                    dispatch({
                      type: "set",
                      payload: { tokenAmount: e.target.value },
                    });
                  }}
                />
                <h3>$0</h3>
              </span>
            </span>
            <span>
              <a
                href={`https://www.shadow.so/liquidity/manage/${contracts.lpToken}/712094`}
                target="_blank"
                className="text-white/60 text-sm flex gap-2 p-2 underline  w-30"
              >
                <h3>View Pool</h3>
                <HiOutlineExternalLink className="mt-0.5" />
              </a>
            </span>
          </div>
        )}

        {/* We gotta put this in a component and map t out to much reuse code area of interest ends where blank comment pops up */}
        {type == "Lock" || type == "Extend" ? (
          <div className="p-5">
            <h3>Lock Time</h3>
            <div className="grid grid-cols-4 gap-3 mt-3">
              <button
                className="border border-[#2A2B30] rounded-full"
                onClick={() => {
                  dispatch({ type: "set", payload: { lockTime: 7 } });
                }}
              >
                1W
              </button>
              <button
                className="border border-[#2A2B30] rounded-full"
                onClick={() => {
                  dispatch({ type: "set", payload: { lockTime: 14 } });
                }}
              >
                2W
              </button>{" "}
              <button
                className="border border-[#2A2B30] rounded-full"
                onClick={() => {
                  dispatch({ type: "set", payload: { lockTime: 7 } });
                }}
              >
                3W
              </button>{" "}
              <button
                className="border border-[#2A2B30] rounded-full"
                onClick={() => {
                  dispatch({ type: "set", payload: { lockTime: 21 } });
                }}
              >
                1M
              </button>
              <button
                className="border border-[#2A2B30] rounded-full"
                onClick={() => {
                  dispatch({ type: "set", payload: { lockTime: 28 } });
                }}
              >
                3M
              </button>
              <button
                className="border border-[#2A2B30] rounded-full"
                onClick={() => {
                  dispatch({ type: "set", payload: { lockTime: 365 } });
                }}
              >
                1Y
              </button>
              <CalenderModal />
            </div>
            {/*  */}
            <div className="p-2 grid grid-flow-row  gap-2 mt-2">
              <div className=" flex justify-between text-xs">
                <h3>Tokens locked:</h3>
                <h3>{state.tokenAmount}</h3>
              </div>
              <div className=" flex justify-between text-xs ">
                <h3>Voting power:</h3>
                <h3>{state.votingPower || "-"}</h3>
              </div>
            </div>
          </div>
        ) : null}

        <TxToaster />
        <span>
          <LPPairsModal
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </span>
        <div className="p-3  flex justify-center text-center gap-2 text-white">
          <button
            className="border cursor-pointer w-full p-3 rounded-md bg-[#E65C00] border-[#383941] font-extrabold mt-2 hover:bg-[#FF6B00]/90"
            onClick={handleTxInitiation}
          >
            <span className="text-[16px] font-semibold">
              {state.load ? (
                <>
                  <AiOutlineLoading3Quarters className="m-auto animate-spin" />
                </>
              ) : (
                btn
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LockSwapModal;
