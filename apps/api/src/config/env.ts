// src/env.ts
import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const CLIENT_URL = required("CLIENT_URL");
export const PORT = process.env.PORT || "4000";
export const SUPABASE_URL = required("SUPABASE_URL");
export const SUPABASE_SECRET_KEY = required("SUPABASE_SECRET_KEY");
