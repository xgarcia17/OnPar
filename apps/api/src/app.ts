import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { CLIENT_URL } from "./config/env.js";

const app = express();

console.log("Allowed CORS origin:", CLIENT_URL);

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", routes);

export default app;
