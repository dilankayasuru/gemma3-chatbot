import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import { StreamChat } from "stream-chat";

import userRoutes from "../src/routes/userRoutes";
import chatRoutes from "../src/routes/chatRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to the database
connectDatabase(process.env.MONGODB_URI!);

export const chatClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY!,
    process.env.STREAM_API_SECRET!,
);

// Routes
app.use("/api", userRoutes);
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));