import type { Request, Response } from "express";
import type { ApiResponse, User } from "@onpar/shared";

export function getUserById(req: Request, res: Response) {
  const user: User = {
    id: 402,
    username: "jdog01",
    name: "Jane Doe",
  };
  const resp: ApiResponse<User> = {
    success: true,
    data: user,
  };
  res.status(200).json(resp);
}
