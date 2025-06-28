// app/news/loading.tsx
"use client";

import NProgress from "nprogress";
import { useEffect } from "react";
import "@/styles/nprogress.css";

export default function Loading() {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return null; // no UI, just the progress bar
}
