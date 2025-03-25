import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/clerk-react";
import * as RadixUI from '@radix-ui/react-visually-hidden';

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
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
        <RadixUI.Root>
          <DialogTitle>Invite Organization Members</DialogTitle>
        </RadixUI.Root>
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};
