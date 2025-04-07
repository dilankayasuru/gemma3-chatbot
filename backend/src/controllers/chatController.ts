import { Request, Response } from "express";
import { chatClient } from "../server";
import axios from "axios";
import { User } from "../models/user";
import { Chat } from "../models/message";

export const chat = async (req: Request, res: Response): Promise<any> => {
    const { message } = req.body;

    const userId = req.user!.userId;

    if (!message) {
        return res.status(400).json({ error: "Message required!" });
    }

    try {

        const OLLAMA_URI = process.env.OLLAMA_URI;

        // Verfiy user exists
        const userResponce = await chatClient.queryUsers({ id: userId });

        if (!userResponce.users.length) {
            return res.status(404).json({ error: "User not found. please register first!" });
        }

        const existingUser = await User.findOne({ userId: userId });

        if (!existingUser) {
            return res.status(400).json({ error: "Please register first!" })
        }

        let chats = await Chat.find({ userId: userId }).sort({ createdAt: -1 }).limit(10);

        const context = chats.flatMap(chat => [
            { role: 'user', content: chat.message },
            { role: 'assistant', content: chat.reply },
        ])

        // Send message to ollama model
        const response = await axios.post(OLLAMA_URI!, {
            model: "gemma3:1b",
            messages: [
                ...context,
                { role: "user", content: message }
            ],
            stream: false
        })

        const assistantMessage = response.data.message.content;

        await Chat.insertOne({
            userId: userId,
            message: message,
            reply: assistantMessage,
        })

        const channel = chatClient.channel('messaging', `chat-${userId}`, {
            name: "Ai Chat",
            created_by_id: 'ai_bot'
        });

        await channel.create();
        await channel.sendMessage({ text: assistantMessage, user_id: 'ai_bot' });

        chats = await Chat.find({ userId: userId });

        res.status(200).json({
            messages: chats
        });

    } catch (error) {
        console.error("Error generating message! " + error)
        return res.status(500).json({ error: "Internal server error!" });
    }
}

export const getMessages = async (req: Request, res: Response): Promise<any> => {

    const userId = req.user!.userId;

    try {
        const chats = await Chat.find({ userId: userId });

        res.status(200).json({
            messages: chats
        });

    } catch (error) {
        console.log(`Error retreving chats: ${error}`)
        res.status(500).json({ error: "Internal server error!" });
    }
}