import express, {Request, Response} from "express";
import UserController from "../controllers/user.controller";
import jwt from "jsonwebtoken"
import {User} from "../models/user.entity";
import {body, validationResult} from 'express-validator';


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
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    const controller = new UserController();
    const response = await controller.loginUser(req.body)
    if (response instanceof User) {
        const token = jwt.sign({id: response.id, email: response.email}, "YOUR_SECRET_KEY");
        return res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({response});
    }
    res.json({response})
})

export default router