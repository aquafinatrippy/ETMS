import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Auth Error" });


    try {
        const decoded = jwt.verify(token, "YOUR_SECRET_KEY");
        //req.user = decoded.email;
        console.log(decoded)
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
    }
}