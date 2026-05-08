"use client";

import { MINI_BUTTON_CLASSNAME } from "./navbar.constants";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import UserSettingsContent from "./userSettingsContent";

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
        <Box className="absolute right-12 top-12 bg-secondary border-[2px] rounded navbar-modal-border-color items-center py-2 px-4">
          {/* <Typography id="modal-modal-title" className="text-center" variant="h6" component="h2">
            {username}
          </Typography> */}
          <UserSettingsContent />
        </Box>
      </Modal>
    </>
  );
}
