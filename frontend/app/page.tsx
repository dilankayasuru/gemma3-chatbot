import { Chat } from "./components/chat";
import { Header } from "./components/header";
import { Sender } from "./components/sender";

export default function Home() {
  return (
    <>
      <Header />
      <div className="grid h-[calc(100vh-80px)] bg-[url(/images/bg.webp)] bg-blend-soft-light bg-background bg-repeat bg-contain overflow-y-auto">
        <Chat />
      </div>
      <Sender />
    </>

  );
}
