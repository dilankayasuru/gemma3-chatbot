import Image from "next/image";
import { Auth } from "./components/auth";

export default function Page() {

    return (
        <main className="px-4 py-32 bg-[url(/images/bg.webp)] bg-blend-soft-light bg-background bg-repeat bg-contain min-h-screen">
            <div className="flex justify-center items-center flex-col">
                <Image src="/images/logo.webp" alt="Robot logo" width={120} height={120} className="mb-4" />
                <p className="text-3xl font-semibold text-center mb-2">Gemma3 Chatbot</p>
                <Auth />
            </div>
        </main>
    )
}