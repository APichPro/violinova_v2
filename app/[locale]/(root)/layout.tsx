import LeftSidebar from "@/components/LeftSidebar";
import Player from "@/components/Player";
import RightSideBar from "@/components/RightSideBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col h-screen w-screen">
      <main className="flex w-screen h-full items-center overflow-hidden">
        <LeftSidebar />
        <section className="flex flex-col size-full items-center pt-24 px-8">
          {children}
        </section>
        <RightSideBar />
      </main>
      <Player />
    </div>
  );
}
