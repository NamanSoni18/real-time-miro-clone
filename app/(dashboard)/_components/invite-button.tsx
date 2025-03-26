"use client";

import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[880px] border-none p-0 bg-transparent">
        <DialogTitle className="sr-only">
          Invite Organization Members
        </DialogTitle>
        <OrganizationProfile
          routing="virtual"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border-none w-full",
              scrollBox: "rounded-lg border bg-background shadow-lg",
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
