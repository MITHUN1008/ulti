import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// const isSignInPage = createRouteMatcher(["/"]);
const isProtectedRoute = createRouteMatcher(["/workspace"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  // if (isSignInPage(request) && convexAuth.isAuthenticated()) {
  //   return nextjsMiddlewareRedirect(request, "/workspace");
  // }
  if (isProtectedRoute(request) && !convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, "/");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
