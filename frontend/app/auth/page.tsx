import Image from "next/image";
import { EmailIcon } from "../components/icons";

export default function Page() {
    return (
        <main className="px-4 py-32 bg-[url(/images/bg.webp)] bg-blend-soft-light bg-background bg-repeat bg-contain min-h-screen">
            <div className="flex justify-center items-center flex-col">
                <Image src="/images/logo.webp" alt="Robot logo" width={120} height={120} className="mb-4" />
                <p className="text-3xl font-semibold text-center mb-2">Gemma3 Chatbot</p>
                <p className="text-lg">Log in or sign up</p>
                <div className="w-full py-8 max-w-sm">
                    <div className="flex items-center justify-between px-4 p-2 bg-accent rounded-xl w-full mb-4 gap-2">
                        <EmailIcon className="opacity-50"/>
                        <input type="email" placeholder="Enter your email" aria-label="Enter your email" className="outline-none w-full" />
                    </div>
                    <button className="bg-primary px-4 py-2 w-full rounded-xl font-medium">Continue</button>
                </div>
            </div>
        </main>
    )
}