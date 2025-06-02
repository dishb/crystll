export default function validatePathname(pathname: string) {
  return [
    "/upload",
    "/dashboard",
    "/",
    "/login",
    "/about",
    "/pricing",
    "/contact",
  ].includes(pathname);
}
