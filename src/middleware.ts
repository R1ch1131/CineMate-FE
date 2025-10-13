import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth",
    },
  },
);

export const config = {
  matcher: ["/profile", "/protected/:path*"],
};
