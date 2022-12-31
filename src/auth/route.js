import Router from "express";
import { redisClient } from "../redis/connection.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  return res.status(200).json({ username });
});

export default authRouter;
