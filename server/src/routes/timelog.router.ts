import express, {Request, Response} from "express";
import TimelogController from "../controllers/timelog.controller";

const router = express.Router()

router.get("/times/:userId", async (req: Request, res: Response) => {
    const controller = new TimelogController()
    const response = await controller.getAllTimelogs(req.params.userId)
    return res.json(response)
})

export default router