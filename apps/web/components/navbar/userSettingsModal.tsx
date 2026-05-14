"use client";

import { MINI_BUTTON_CLASSNAME } from "./navbar.constants";
import { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import UserSettingsContent from "./userSettingsContent";
import { User } from "@onpar/shared";
import { getUserById } from "@/lib/api/users";

export default function UserSettingsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userId = 402;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user");
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  return (
    <>
      <button
        className={`${MINI_BUTTON_CLASSNAME} text-navbar-inactive`}
        onClick={handleOpen}
      >
        {isLoading ? "Loading..." : error ? "User unavailable" : user?.name}
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
