"use client"
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/stores/userSlice";

export const Header = () => {
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();

    return (
        <div className="p-4 bg-accent shadow-xl fixed top-0 w-full z-20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <Image src="/images/logo.webp" alt="Robot logo" width={60} height={60} />
                <h1 className="text-xl">Gemma3 ChatBot</h1>
            </div>
            {user.name ? <button onClick={() => dispatch(logout())}>Logout</button> :
                <Link href="/auth" className="bg-primary px-4 py-2 rounded-xl font-medium cursor-pointer">Sign in</Link>
            }
        </div>
    )
}