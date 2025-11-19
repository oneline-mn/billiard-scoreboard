"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CustomDialogProps {
  open?: boolean;
  trigger: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  showFooter?: boolean;
  disableConfirm?: boolean;
  contentClassName?: string;
}

export function CustomDialog({ cancelText = "Cancel", children, confirmText = "Confirm", contentClassName = 'max-w-md', description = ' ', disableConfirm = false, onConfirm, onOpenChange, open, showFooter = true, title = "Dialog Title", trigger }: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogTrigger asChild>{trigger ? trigger : <Button variant="outline">Open Dialog</Button>}</DialogTrigger>
        <DialogContent className={contentClassName}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <div className="py-2">{children}</div>

          {showFooter && (
            <DialogFooter className=" grid grid-cols-2">
              <DialogClose asChild>
                <Button variant="outline">{cancelText}</Button>
              </DialogClose>
                <Button type="submit" onClick={onConfirm}  disabled={disableConfirm}>
                  {confirmText}
                </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
}
