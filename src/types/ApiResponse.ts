import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiMeta {
  timestamp: string;
  requestId: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
}

export function success<T>({ data, status = 200, requestId, message, pagination }: { data: T; status?: number; requestId: string; message?: string; pagination?: PaginationInfo }): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      meta: {
        timestamp: new Date().toISOString(),
        requestId,
        pagination,
      },
    },
    { status }
  );
}

export function error({ error, status = 500, requestId }: { error: ApiError; status?: number; requestId: string }): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error,
      meta: {
        timestamp: new Date().toISOString(),
        requestId,
      },
    },
    { status }
  );
}

export function notFound({ message = "Resource not found", requestId }: { message?: string; requestId: string }): NextResponse {
  return error({
    error: { code: "NOT_FOUND", message },
    status: 404,
    requestId,
  });
}

export function unauthorized({ message = "Unauthorized request denied", requestId }: { message?: string; requestId: string }): NextResponse {
  return error({
    error: { code: "UNAUTHORIZED", message },
    status: 401,
    requestId,
  });
}

export function forbidden({ message = "Forbidden access denied", requestId }: { message?: string; requestId: string }): NextResponse {
  return error({
    error: { code: "FORBIDDEN", message },
    status: 403,
    requestId,
  });
}

export function badRequest({ message = "Bad request", requestId }: { message?: string; requestId: string }): NextResponse {
  return error({
    error: { code: "BAD_REQUEST", message },
    status: 400,
    requestId,
  });
}

export function internalServerError({ message = "Something went wrong! Please try again", requestId }: { message?: string; requestId: string }): NextResponse {
  return error({
    error: { code: "INTERNAL_SERVER_ERROR", message },
    status: 500,
    requestId,
  });
}

export function conflict({ message = "Conflict occurred", requestId }: { message?: string; requestId: string }): NextResponse {
  return error({
    error: { code: "CONFLICT", message },
    status: 409,
    requestId,
  });
}