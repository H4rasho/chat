import { Router } from "express";

import authRouter from "./src/auth/route.js";

const router = Router();

router.use("/auth", authRouter);

export default authRouter;
