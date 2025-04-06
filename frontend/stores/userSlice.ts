import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    name: string,
    email: string,
    userId: string,
}

export interface UserState {
    value: IUser,
}

const initialState: UserState = {
    value: {
        name: "",
        email: "",
        userId: "",
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.value = action.payload
        },
        logout: state => {
            localStorage.removeItem("token");
            state.value = {
                name: "",
                email: "",
                userId: "",
            };
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer;