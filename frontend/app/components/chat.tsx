"use client"
import { useEffect, Fragment } from "react";
import { EmptyChat } from "./emptyChat";
import { apiGetMessages } from "../api";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setMessages } from "@/stores/messagesSlice";
import { ScrollToBottom } from "./scrollToBottom";

export const Chat = () => {
    const messages = useAppSelector((state) => state.messages.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchMessages() {
            const response = await apiGetMessages();
            dispatch(setMessages(response.messages));
        }

        fetchMessages();
    }, [dispatch])

    if (!messages.length) {
        return <EmptyChat />
    }

    return (
        <div className="pt-28 pb-8 px-4 flex flex-col justify-end">
            {
                messages.map((message, idx) => (
                    <Fragment key={idx}>
                        <div className="self-end bg-primary p-4 rounded-2xl w-fit mb-2 max-w-xs">{message.message}</div>
                        {message.createdAt &&
                            <div className="self-end text-sm mb-4">{new Date(message.createdAt).toLocaleTimeString()}</div>
                        }
                        <div className={`bg-accent p-4 rounded-2xl mr-8 w-fit max-w-xs mb-4 ${message.reply === "thinking..." ? 'animate-pulse' : null}`}>{message.reply}</div>
                    </Fragment>
                ))
            }
            <ScrollToBottom />
        </div>
    )
}