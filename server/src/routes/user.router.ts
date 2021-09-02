import express, {Request, Response} from "express";
import UserController from "../controllers/user.controller";
import jwt from "jsonwebtoken"
import {User} from "../models/user.entity";
import {body, validationResult} from 'express-validator';
import jwtAuth from "../middleware/auth"


const router = express.Router()


router.post("/register", body('email').isEmail(), body("password").isLength({min: 6}), async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    const controller = new UserController();
    const response = await controller.createUser(req.body)
    return res.status(200).send(response)
})

router.post("/login", body('email').isEmail(), body("password").isLength({min: 6}), async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({response: errors.array()})
    const controller = new UserController();
    const response = await controller.loginUser(req.body)
    if (response instanceof User) {
        const token = jwt.sign({id: response.id, email: response.email}, "YOUR_SECRET_KEY");
        return res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                expires: new Date(Date.now() + 16 * 3600000)
            })
            .status(200)
            .json({token, user: response});
    }
    res.status(400).json({response})
})

router.get("/logout", jwtAuth, async (req: Request, res: Response) => {
    res.clearCookie("access_token");
    res.json({message: "Cookie deleted"})
})

router.get("/user", jwtAuth, async (req: Request, res: Response) => {
    const controller = new UserController()
    const response = await controller.currentUser((req as any).id.id)
    return res.json({response})
})

export default router