import Image from "next/image";

export const Loading = () => {
    return (
        <div className="fixed top-0 left-0 h-screen z-50 w-full bg-background/50 backdrop-blur-lg flex justify-center items-center flex-col">
            <Image src="/images/logo.webp" alt="Robot logo" width={120} height={120} className="mb-2 animate-bounce"/>
            <p className="animate-pulse">Loading...</p>
        </div>
    )
}