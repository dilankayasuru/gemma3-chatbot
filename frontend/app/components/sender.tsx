"use client"
import { useState } from "react";
import { apiSendMessage } from "../api";
import { SendIcon } from "./icons";
import { useDispatch } from "react-redux";
import { sendMessage, setMessages } from "@/stores/messagesSlice";

export const Sender = () => {
    const dispatch = useDispatch();

    const [message, setMessage] = useState("");

    const handleSendMessage = async () => {
        if (message) {
            dispatch(sendMessage(message));
            setMessage("");
            const response = await apiSendMessage(message);
            dispatch(setMessages(response.messages));
        }
    }

    return (
        <div className="fixed bottom-0 w-full z-20 md:backdrop-blur-3xl md:py-4 md:flex md:justify-center md:items-center md:bg-background/15">
            <div className="flex items-center gap-2 p-4 bg-accent shadow-xl md:max-w-5xl md:rounded-xl md:w-full">
                <textarea placeholder="Ask anything..." aria-label="Enter your message" className="grow-1 outline-none" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button aria-label="send message" className="bg-primary px-4 py-2 rounded-xl" onClick={handleSendMessage}>
                    <SendIcon />
                </button>
            </div>
        </div>
    )
}