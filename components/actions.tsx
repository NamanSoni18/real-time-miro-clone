"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRenameModal } from "@/store/use-rename-modal";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
  onRename?: (newTitle: string) => void;
}

/**
 * @name Actions
 * @description Actions component is built on top of shadcn DropdownMenu component to allow users to do various actions (copy link url, rename the board, and delete the board) on the board they created
 * @param param0 children accepts React elements (JSX Elements) to let user open the dropdown menu (required)
 * @param param1 side accepts an argument of type DropdownMenuContentProps["side"] (optional)
 * @param param2 sideOffset accepts an argument of type DropdownMenuContentProps["sideOffset"] (optional)
 * @param param3 id accepts an argument of type string (id of the board) (required)
 * @param param4 title accepts an argument of type title (title of the board) (required)
 * @returns JSX Element
 */
export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
  onRename,
}: ActionsProps) => {
  const { onOpen } = useRenameModal();
  const { mutate, pending } = useApiMutation(api.board.remove);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleRename = () => {
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    if (newTitle.length > 60) {
      toast.error("Title cannot be longer than 60 characters");
      return;
    }
    onRename?.(newTitle);
    setIsRenameOpen(false);
  };

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"));
  };

  return (
    <>
      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Board</DialogTitle>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new title"
            className="mt-4"
          />
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsRenameOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          side={side}
          sideOffset={sideOffset}
          className="w-60"
        >
          <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
            <Link2 className="h-4 w-4 mr-2" />
            Copy board link
          </DropdownMenuItem>
          {onRename && (
            <DropdownMenuItem
              onClick={() => {
                setNewTitle(title);
                setIsRenameOpen(true);
              }}
            >
              Rename
            </DropdownMenuItem>
          )}
          <ConfirmModal
            header="Delete board?"
            description="This will delete the board and all of its content."
            disabled={pending}
            onConfirm={onDelete}
          >
            <Button
              className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
              variant="ghost"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
