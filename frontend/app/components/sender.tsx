import { SendIcon } from "./icons";

export const Sender = () => {
    return (
        <div className="flex items-center gap-2 p-4 bg-accent shadow-xl fixed bottom-0 w-full z-20">
            <textarea placeholder="Ask anything..." aria-label="Enter your message" className="grow-1 outline-none" />
            <button aria-label="send message" className="bg-primary px-4 py-2 rounded-xl">
                <SendIcon />
            </button>
        </div>
    )
}