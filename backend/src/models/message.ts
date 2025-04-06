import { model, Schema } from "mongoose"

interface IChat {
    userId: string,
    message: string,
    reply: string,
    createdAt: Date,
}

const chatSchema = new Schema<IChat>({
    userId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    reply: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Chat = model<IChat>("Chat", chatSchema);

export { Chat };