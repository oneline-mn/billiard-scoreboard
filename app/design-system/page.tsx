"use client";

import { showToast } from "@/components/shared/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans p-10">
      <div className="min-h-screen space-y-8">
        {/* Button */}
        <div className="space-y-4">
          <h1 className="font-bold">Button</h1>
          <div className="flex gap-4">
            <Button className="">Get Started</Button>

            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Button Link</Button>
          </div>
        </div>

        <Separator />

        {/* Input */}
        <div className="space-y-4">
          <h1 className="font-bold">Input</h1>
          <div className="flex gap-4">
            <Input placeholder="Type here..." />
          </div>
        </div>
        <Separator />

        {/* Checkbox */}
        <div className="space-y-4">
          <h1 className="font-bold">Checkbox</h1>
          <div className="flex items-center gap-3">
            <Checkbox id="terms" defaultChecked />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </div>
        <Separator />

        {/* Item & Separator */}
        <div className="space-y-4">
          <h1 className="font-bold">Item and Separator</h1>

          {/* Item & content */}
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Basic Item</ItemTitle>
              <ItemDescription>A simple item with title and description.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Action
              </Button>
            </ItemActions>
          </Item>
          <Separator className="my-4" />

          {/* Item & media */}
          <Item variant="outline" size="sm" asChild>
            <a href="#">
              <ItemMedia>
                <BadgeCheckIcon className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Your profile has been verified.</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </a>
          </Item>
        </div>

        <Separator />
        {/* ScrollArea */}
        <div className="space-y-4">
          <h1 className="font-bold">ScrollArea</h1>
          <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
              {tags.map((tag) => (
                <React.Fragment key={tag}>
                  <div className="text-sm">{tag}</div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </div>
        <Separator />

        {/* Sonner */}
        <div className="space-y-4">
          <h1 className="font-bold">Toaster || Sonner /shadcn/ </h1>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => showToast("default", "Default Toast", "Lorem ipsum dolor sit amet.")}>
              Default
            </Button>

            <Button variant="outline" onClick={() => showToast("success", "Lorem ipsum dolor sit amet.")}>
              Success
            </Button>

            <Button variant="outline" onClick={() => showToast("info", "Information", "Lorem ipsum dolor sit amet.")}>
              Info
            </Button>

            <Button variant="outline" onClick={() => showToast("warning", "Warning!", "Lorem ipsum dolor sit amet.")}>
              Warning
            </Button>

            <Button variant="outline" onClick={() => showToast("error", "Error!", "Lorem ipsum dolor sit amet.")}>
              Error
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
