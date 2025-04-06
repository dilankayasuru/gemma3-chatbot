import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IMessage {
    createdAt?: Date,
    message: string,
    reply: string,
    userId?: string,
}

export interface MessagesState {
    value: IMessage[],
}

const initialState: MessagesState = {
    value: []
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.value = action.payload
        },
        sendMessage: (state, action: PayloadAction<string>) => {
            state.value.push({
                message: action.payload,
                reply: "thinking...",
            })
        }
    }
})

export const { setMessages, sendMessage } = messagesSlice.actions;

export default messagesSlice.reducer;