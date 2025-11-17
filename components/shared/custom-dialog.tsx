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
}

export function CustomDialog({ open, trigger, onOpenChange, title = "Dialog Title", description = ' ', children, cancelText = "Цуцлах", confirmText = "Баталгаажуулах", onConfirm, showFooter = true, disableConfirm = false }: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogTrigger asChild>{trigger ? trigger : <Button variant="outline">Open Dialog</Button>}</DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <div className="py-2">{children}</div>

          {showFooter && (
            <DialogFooter>
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
