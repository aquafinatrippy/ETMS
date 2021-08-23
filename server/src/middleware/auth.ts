import jwt from "jsonwebtoken";
import {NextFunction, Response} from 'express'

export default function (req: any, res: Response, next: NextFunction) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    try {
        const id = jwt.verify(token, "YOUR_SECRET_KEY");
        req.id = id
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
    }
}