import type { Request, Response } from "express";
import type { UserResponse } from "@onpar/shared";

export function getUserById(req: Request, res: Response) {
  const userRes: UserResponse = {
    id: 402,
    username: "jdog01",
    name: "Jane Doe",
  };
  res.status(200).json({
    success: true,
    data: userRes,
  });
}
