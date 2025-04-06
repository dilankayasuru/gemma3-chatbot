"use client"
import { useAppSelector } from "@/stores/hooks";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "./avatar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
    const user = useAppSelector((state) => state.user.value);
    const router = useRouter();

    useEffect(() => {
        if (!user.email) {
            router.push("/auth");
        }
    }, [user, router]);

    return (
        <div className=" fixed top-0 w-full z-20 bg-accent">
            <div className="p-4 md:py-2 shadow-xl flex items-center justify-between gap-4 md:max-w-5xl md:mx-auto">
                <div className="flex items-center gap-2">
                    <Image src="/images/logo.webp" alt="Robot logo" width={60} height={60} className="md:w-11" />
                    <h1 className="text-xl">Gemma3 ChatBot</h1>
                </div>
                {user.name ? <Avatar /> :
                    <Link href="/auth" className="bg-primary px-4 py-2 rounded-xl font-medium cursor-pointer">Sign in</Link>
                }
            </div>
        </div>
    )
}