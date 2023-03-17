import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  request.headers.set(
    "Authorization",
    `Bearer ${request.cookies.get("accessToken")}` || ""
  );

  return NextResponse.next({ request: { headers: request.headers } });
}

export const config = {
  matcher: "/api/:path*",
};
