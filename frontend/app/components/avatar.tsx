"use client"
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useState } from "react";
import { LogoutIcon } from "./icons";
import { logout } from "@/stores/userSlice";

export const Avatar = () => {
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} aria-label="profile button" className="cursor-pointer overflow-hidden rounded-full bg-foreground w-11 h-11 flex justify-center items-center border-primary border-4"><span className="text-2xl font-semibold uppercase text-background">{user.name[0]}</span></button>
            {open &&
                <div className="absolute bg-background text-foreground right-0 mt-2 rounded-2xl p-4 shadow-2xl">
                    <button className="flex gap-2 justify-between items-center cursor-pointer" aria-label="logout" onClick={handleLogout}>Logout <LogoutIcon /></button>
                </div>
            }
        </div>
    )
}