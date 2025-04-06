import { Request, Response } from "express";
import { chatClient } from "../server";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const register = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required!" });
    }

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" });
        }

        let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be 8+ characters with uppercase, lowercase, number, and special character." });
        }

        const userId = email.replace(/[^a-zA-Z0-9_-]/g, '_');

        const userResponce = await chatClient.queryUsers({ id: { $eq: userId } });

        if (!userResponce.users.length) {
            await chatClient.upsertUser({
                id: userId,
                name: name,
                email: email,
                role: "user"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.insertOne({
            userId: userId,
            name: name,
            email: email,
            password: hashedPassword,
        });

        const token = await jwt.sign({
            userId: userId,
            name: name,
            email: email,
        }, JWT_SECRET_KEY!, { expiresIn: '1h' });

        return res.status(200).json({ userId, name, email, token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error",
            message: error
        });
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email, and password are required!" });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: "User does not exists!" });
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res.status(400).json({ error: "Invalid password!" });
        }

        const userResponce = await chatClient.queryUsers({ id: { $eq: user.userId } });

        if (!userResponce.users.length) {
            await chatClient.upsertUser({
                id: user.userId,
                name: user.name,
                email: user.email,
                role: "user"
            });
        }

        const token = await jwt.sign({
            id: user.userId,
            name: user.name,
            email: user.email,
        }, JWT_SECRET_KEY!, { expiresIn: '1h' });

        return res.status(200).json({ userId: user.userId, name: user.name, email: user.email, token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error",
            message: error
        });
    }
}

export const checkUser = async (req: Request, res: Response): Promise<any> => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required!" });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: "User does not exists!" });
        }

        const userResponce = await chatClient.queryUsers({ id: { $eq: user.userId } });

        if (!userResponce.users.length) {
            return res.status(400).json({ error: "User does not exists!" });
        }

        return res.status(200).json({ name: user.name, email: user.email });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error",
            message: error
        });
    }
}