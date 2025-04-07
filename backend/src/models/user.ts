import { Schema, model } from "mongoose";

export interface IUser {
    userId: string;
    name: string;
    email: string;
    createdAt: Date;
    password: string;
}

const userSchema = new Schema<IUser>({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

const User = model<IUser>('User', userSchema);

export { User };