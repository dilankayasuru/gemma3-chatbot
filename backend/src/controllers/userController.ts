import { Request, Response } from "express";
import { chatClient } from "../server";
import { User } from "../models/user";

export const register = async (req: Request, res: Response): Promise<any> => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required!" });
    }

    try {
        const userId = email.replace(/[^a-zA-Z0-9_-]/g, '_');

        const userResponce = await chatClient.queryUsers({ id: { $eq: userId } });

        if (!userResponce.users.length) {
            await chatClient.upsertUser({
                id: userId,
                name: name,
                email: email,
                role: "user"
            })
        }

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            await User.insertOne({
                userId: userId,
                name: name,
                email: email,
            })
        }

        res.status(200).json({ userId, name, email });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Internal server error",
            message: error
        })
    }
}