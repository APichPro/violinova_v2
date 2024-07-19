import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative h-screen w-full">
      <div className=" absolute size-full">
        <Image
          src="/images/bg.png"
          alt="background"
          fill
          className="size-full"
        />
      </div>
      {children}
    </main>
  );
}