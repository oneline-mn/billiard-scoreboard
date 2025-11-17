"use client";

import React from "react";
import { toast } from "sonner";

type ToastVariant = "default" | "success" | "info" | "warning" | "error";

export function showToast(variant: ToastVariant, description?: React.ReactNode) {
  const opts = {
    description,
  };

  switch (variant) {
    case "success":
      return toast.success("Амжилттай", opts);
    case "info":
      return toast.info("Мэдээлэл", opts);
    case "warning":
      return toast.warning("Анхаар!", opts);
    case "error":
      return toast.error("Алдаа!", opts);
    default:
      return toast("", opts);
  }
}
