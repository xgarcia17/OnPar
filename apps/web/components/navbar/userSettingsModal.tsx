"use client";

import { MINI_BUTTON_CLASSNAME } from "./navbar.constants";
import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";

export default function UserSettingsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const username = "Jane Doe";
  return (
    <>
      <button
        className={`${MINI_BUTTON_CLASSNAME} text-navbar-inactive`}
        onClick={handleOpen}
      >
        {username}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box className="">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
