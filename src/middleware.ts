//this is the middleware that will be used to check if the user is authenticated or not before rendering the page.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract token and user from cookies
  const token = request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("user")?.value;

  if (!token || !userCookie) {
    // If no token or user is found, redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Parse the user data from the cookie (since it's JSON stringified)
  try {
    const user = JSON.parse(userCookie);
    // You can add additional checks here if needed
  } catch (error) {
    // If there's an error parsing the user cookie, redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If everything checks out, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
