import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">billboard</h1>
          <p className="max-w-md text-lg leading-8">
            Press here to see the preview:{" "}
            <Button variant={"link"} asChild>
              <Link href="https://billboard.dulmandakh-bce.workers.dev" className="text-primary">
                live preview
              </Link>
            </Button>
          </p>
        </div>
        <Button asChild>
          <Link href={"/design-system"} className="italic font-semibold">Design system page</Link>
        </Button>
      </main>
    </div>
  );
}
