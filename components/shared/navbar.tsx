"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Component, ScreenShare } from "lucide-react";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <section className="w-full sticky top-4">
      <div className="max-w-md w-fit mx-auto bg-background border-fill border p-2 rounded-full flex justify-between items-center space-x-4">
        <div className="flex h-full space-x-2">
          <Button variant={pathname === "/" ? "secondary" : "outline"} asChild className="h-10 rounded-full">
            <Link href={"/"} className="font-semibold">
              Leaderboard
            </Link>
          </Button>
          <Button variant={pathname === "/match" ? "secondary" : "outline"} asChild className="h-10 rounded-full">
            <Link href={"/match"} className="font-semibold">
              Match
            </Link>
          </Button>
        </div>

        <Separator orientation="vertical" className=" w-1 h-8!" />
        <div className="flex gap-2 ">
          <Button variant="outline" asChild className="size-10 rounded-full">
            <Link href={"/design-system"} className="italic font-semibold">
              <Component />
            </Link>
          </Button>
          <Button variant="outline" asChild className="size-10 rounded-full">
            <Link href="https://billboard.dulmandakh-bce.workers.dev" className="italic font-semibold">
              <ScreenShare />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
