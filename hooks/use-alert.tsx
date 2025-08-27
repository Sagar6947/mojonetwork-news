"use client";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type AlertVariant = "info" | "danger" | "success" | "warning" | "dark";

interface AlertProps { id?: string; variant?: AlertVariant; message: ReactNode; }

const variantStyles: Record<AlertVariant, string> = {
    info: "text-blue-800 bg-blue-50 border-blue-200 dark:bg-gray-800 dark:text-blue-400",
    danger: "text-red-800 bg-red-50 border-red-200 dark:bg-gray-800 dark:text-red-400",
    success: "text-green-800 bg-green-50 border-green-200 dark:bg-gray-800 dark:text-green-400",
    warning: "text-yellow-800 bg-yellow-50 border-yellow-200 dark:bg-gray-800 dark:text-yellow-300",
    dark: "text-gray-800 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:text-gray-300",
};

export function Alert({ id, variant = "info", message }: AlertProps) {
    return (
        <div id={id} className={cn(
            "flex items-center p-4 mb-4 text-sm rounded-lg border shadow-sm",
            variantStyles[variant]
        )} role="alert"
        >
            <svg
                className="shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="ms-3 font-medium">&nbsp;{message}</div>
        </div>
    );
}
