import { NextResponse } from "next/server";

type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T | null;
  error?: any;
};

export function apiResponse<T>(
  success: boolean,
  message: string,
  data: T | null = null,
  error: any = null,
  status: number = 200
) {
  const payload: ApiResponse<T> = {
    success,
    message,
    data,
    error,
  };

  return NextResponse.json(payload, { status });
}
