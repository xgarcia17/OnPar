import type { ApiResponse, User } from "@onpar/shared";

const serverUserUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;

export async function getUserById(userId: number): Promise<User> {
  const res = await fetch(`${serverUserUrl}/${userId}`);

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  const json: ApiResponse<User> = await res.json();

  if (!json.success) {
    throw new Error(json.error.message);
  }

  return json.data;
}
