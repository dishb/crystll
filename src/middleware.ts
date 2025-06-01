import { auth } from "@/auth";

export default auth((req) => {
  if (
    !req.auth &&
    [
      "/upload",
      "/dashboard",
      "/api/get-receipts",
      "/api/upload-receipt",
    ].includes(req.nextUrl.pathname)
  ) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl, 401);
  }
});
