import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { vmsRoutes } from "./configs/accessMatrix";
const adminRoutePrefix = process.env.NEXT_PUBLIC_ADMIN_ROUTES.split(",");

export default withAuth(
  function middleware(req) {
    if (req.nextauth.token.passChangePending) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/change-password";
      return NextResponse.redirect(url);
    } else if (
      adminRoutePrefix.some((prefix) =>
        req.nextUrl.pathname.startsWith(prefix)
      ) &&
      req.nextauth.token?.roles.includes("admin", "superAdmin") === false
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/unauthorized";
      return NextResponse.redirect(url);
    } else if (
      vmsRoutes.paths.some((path) => req.nextUrl.pathname.startsWith(path)) &&
      req.nextauth.token?.roles.some((role) =>
        vmsRoutes.allowedRoles.includes(role)
      ) === false
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/unauthorized";
      return NextResponse.redirect(url);
    }
  },
  {
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: [
    "/test",
    "/admin/:path*",
    "/",
  ],
};
