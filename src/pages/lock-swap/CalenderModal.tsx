import Box from "@mui/material/Box";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import Modal from "@mui/material/Modal";
import { FaRegCalendar } from "react-icons/fa";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#1E1F23",
  border: "2px solid #4C5C68",
  borderRadius: "10px",
  color: "#F4F4F5",
  boxShadow: 24,
  outline: "none",
  p: 3,
  width: "100%",
};

export default function CalenderModal() {
  // const { dispatch }: any = useContext(LockContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = React.useState<Date>();
  React.useEffect(() => {}, [selected]);
  return (
    <div>
      <button
        className="border border-[#2A2B30] rounded-full px-8 py-0.5 flex justify-center"
        onClick={handleOpen}
      >
        <FaRegCalendar className="mt-1 text-sm" />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={style}
      >
        <Box>
          <DayPicker
            animate
            mode="single"
            selected={selected}
            onSelect={() => {
              setSelected;
              handleClose();
            }}
            className="flex justify-center"
          />
        </Box>
      </Modal>
    </div>
  );
}
