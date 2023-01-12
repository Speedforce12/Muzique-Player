import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  // exist while user is authenticated
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  //  allow the request if the token is valid
  const { pathname, origin } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // redirect to login page if the token is invalid and requesting protected route
  // if (!token && pathname !== "/auth/login") {
  //   return NextResponse.redirect(`${origin}/auth/login`);
  // }
}
