import express, {Request, Response} from "express";
import UserController from "../controllers/user.controller";
import jwt from "jsonwebtoken"


const router = express.Router()


router.post("/register", async (req: Request, res: Response) => {
    const controller = new UserController();
    const response = await controller.createUser(req.body)
    return res.send(response)
})

router.post("/login", async (req: Request, res: Response) => {
    const controller = new UserController();
    const response = await controller.loginUser(req.body)
    const token = jwt.sign({ id: response.id, email: response.email }, "YOUR_SECRET_KEY");

    return res
        .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ feedback: response });
})

export default router