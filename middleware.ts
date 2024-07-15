import {
  clerkMiddleware,
  createRouteMatcher,
  ClerkMiddlewareOptions,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect();
//   publicRoutes: ["/", "/forget-password", "/api/webhooks/clerk"];
// });

export default clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
    return NextResponse.next(); // or return a custom response
  },
  {
    publicRoutes: ["/", "/api/webhooks/clerk"],
  } as ClerkMiddlewareOptions
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
