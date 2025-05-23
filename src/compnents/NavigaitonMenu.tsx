import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoMenu } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub, FaLock, FaTelegramPlane, FaVoteYea } from "react-icons/fa";
import { Divider } from "@mui/material";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router";
import { BiDotsHorizontalRounded } from "react-icons/bi";
export default function NavigaitonMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <IoMenu className="visible md:hidden ms-8 text-[20px] text-white/70  mt-2 md:mt-0.5" />
        <BiDotsHorizontalRounded className="invisible md:visible text-[25px] text-white/70   md:mt-0.5" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#1E1F24",
            borderRadius: "10 10 10 10",
            color: "white", // change to your desired color
          },
        }}
      >
        <span className=" ">
          <MenuItem onClick={handleClose}>
            <Link
              to={"/lock"}
              className="flex gap-2 text-white/90 hover: hover:text-white/70  text-sm md:text-[16px]  "
            >
              <FaLock className="mt-1.5 " />

              <h3 className="font-bold mt-0.5">Lock</h3>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              to={"/vote"}
              className="flex gap-2 text-white/90 hover:text-white/70  text-sm md:text-[16px]  "
            >
              <FaVoteYea className="mt-1 " />
              <h3 className="font-bold   mt-0.5">Vote</h3>
            </Link>
          </MenuItem>
          <Divider
            sx={{
              backgroundColor: "#383941",
              width: "90%",
              margin: "auto",
            }}
          />
          <MenuItem onClick={handleClose}>
            <a
              href={"https://t.me/SonicRedDragon"}
              target="_blank"
              className="flex gap-2 text-white/70 hover:text-white/40 text-xs md:text-[12px] font-bold"
            >
              <h3>Community</h3>
              <MdArrowOutward className="mt-0.5" />
            </a>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <a
              href="https://github.com/wenakita/RedDragon"
              target="_blank"
              className="flex gap-2 text-white/70  hover:text-white/40 text-xs md:text-[12px] font-bold"
            >
              <h3>Documentation</h3>
              <MdArrowOutward className="mt-0.5" />
            </a>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <span className="flex gap-3 text-xs md:text-[16px] mt-2">
              <a
                href={"https://t.me/SonicRedDragon"}
                target="_blank"
                className="text-white/70 hover:text-white/40 "
              >
                <FaX />
              </a>
              <a
                href={"https://t.me/SonicRedDragon"}
                target="_blank"
                className="text-white/70 hover:text-white/40"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://github.com/wenakita/RedDragon"
                target="_blank"
                className="text-white/70 hover:text-white/40"
              >
                <FaGithub />
              </a>
            </span>
          </MenuItem>
        </span>
      </Menu>
    </div>
  );
}
