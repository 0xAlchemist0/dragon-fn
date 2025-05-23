import { Box, Button, colors, Divider, Modal, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { dragonPools } from "../../../config/dragonPools";
import PoolPairItem from "./PoolPairItem";
import { assert } from "console";
function LPPairsModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
  setPoolSelected,
}: any) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#2A2B30",
    border: "2px solid #4C5C68",
    borderRadius: "10px",
    color: "#F4F4F5",
    boxShadow: 24,
    outline: "none",
    p: 3,
    width: "100%",
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="font-extrabold text-md">Select A Pool</h4>
          <span className=" grid grid-cols-8 gap-2 mt-3">
            <span className="col-span-7">
              {/* <FaSearch
                className="absolute mt-3 text-xl font-bold"
                style={{ color: "#B0B3BA" }}
              /> */}
              <input
                type="text"
                className="outline-[#FF6B00] border-1 rounded-md w-full font-light text-sm p-1.5 border-[#4C5C68]"
                placeholder="Search name or paste address"
              />
            </span>
            <span className=" rounded-md p-1 border border-[#4C5C68] outline-[#outline-[#FF6B00]">
              <span className="brder flex justify-center">
                <img
                  src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38.png"
                  alt=""
                  className="size-6"
                />{" "}
              </span>
            </span>
          </span>
          <span className="">
            <span className="grid grid-flow-row mt-5 h-100 overflow-y-auto gap-1.5">
              {getPools(setPoolSelected)}
            </span>
          </span>
        </Box>
      </Modal>
    </>
  );
}

function getPools({ setPoolSelected }: any) {
  const pools = dragonPools.map((pool, key) => {
    return <PoolPairItem pool={pool} setPoolSelected={setPoolSelected} />;
  });
  return pools;
}

export default LPPairsModal;
