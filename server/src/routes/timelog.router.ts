import express, {Request, Response} from "express";
import TimelogController from "../controllers/timelog.controller";
import jwtAuth from "../middleware/auth"

const router = express.Router()

router.get("/times", jwtAuth, async (req: Request, res: Response) => {
    const controller = new TimelogController()
    const response = await controller.getAllTimelogs(req.id)
    return res.json(response)
})

router.post("/submit", jwtAuth, async (req: Request, res: Response) => {
    const controller = new TimelogController()
    const response = await controller.submitTimelog(req.body, req.id)
    return res.json(response)
})

router.get("/:timelogId", jwtAuth, async (req: Request, res: Response) => {
    const controller = new TimelogController()
    const response = await controller.findTimelog(req.params.timelogId)
    return res.json(response)
})

router.patch("/end/:timelogId", jwtAuth, async (req: Request, res: Response) => {
    const controller = new TimelogController()
    const response = await controller.endTimelog(req.params.timelogId)
    return res.json(response)
})

router.delete("/:timelogId", jwtAuth, async (req: Request, res: Response) => {
    const controller = new TimelogController()
    const response = await controller.deleteTimelog(req.params.timelogId)
    return  res.json(response)
})

export default router