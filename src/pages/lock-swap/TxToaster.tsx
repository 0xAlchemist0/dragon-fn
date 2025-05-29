import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { LockContext } from "../../context-providers/LockProvider";

function TxToaster() {
  const { state, dispatch }: any = useContext(LockContext);
  const handleClose = () => {
    dispatch({ type: "set", txComplete: false });
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <IoClose fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      {state.txMessage && (
        <Snackbar
          open={state.txReady}
          autoHideDuration={6000}
          onClose={handleClose}
          message={state.txMessage.message}
          action={action}
          sx={{
            fontSize: "10px",
          }}
        />
      )}
    </>
  );
}

export default TxToaster;
