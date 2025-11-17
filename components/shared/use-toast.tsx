"use client";

import { toast } from "sonner";

type ToastVariant = "default" | "success" | "info" | "warning" | "error";

export function showToast(
  variant: ToastVariant,
  message: string,
  description?: string
) {
 
  const opts = {
    description,
  };

  switch (variant) {
    case "success":
      return toast.success(message, opts);
    case "info":
      return toast.info(message, opts);
    case "warning":
      return toast.warning(message, opts);
    case "error":
      return toast.error(message, opts);
    default:
      return toast(message, opts);
  }
}
