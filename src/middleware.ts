export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/upload",
    "/dashboard",
    "/api/get-receipts",
    "/api/upload-receipt",
  ],
};
