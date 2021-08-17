import express from "express";
import UserRouter from "./user.router";
import TimelogRouter from "./timelog.router";

const router = express.Router()

router.use("/auth", UserRouter)
router.use("/timelog", TimelogRouter)

export default router