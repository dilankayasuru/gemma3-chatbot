import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Request, Response } from "express";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const authenticate = async (req: Request, res: Response, next: Function) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            message: 'Please login first!'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY as string) as jwt.JwtPayload;
        
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            throw res.status(403).send('User does not exists!');
        }

        (req as any).user = user;
        next();
    }
    catch (error) {
        res.status(500).send('Internal server error!');
    }
}