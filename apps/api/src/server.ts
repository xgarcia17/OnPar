import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "Welcome to OnPar!" });
});

app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
