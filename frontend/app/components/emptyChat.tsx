import Image from "next/image";

export const EmptyChat = () => {
    return (
        <div className="flex justify-center items-center flex-col">
            <Image src="/images/logo.webp" alt="Robot logo" width={120} height={120} />
            <p className="text-2xl font-semibold">How can I help you today?</p>
        </div>
    )
}