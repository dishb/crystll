import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen -mt-16 flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-col justify-center items-start">
        <h2 className="text-4xl">
          <span className="text-grape font-medium">404</span>: Page Not Found.
        </h2>
        <h1 className="text-8xl leading-28 mt-4">
          <span className="text-ocean italic">Whoops!</span> Looks like this
          page doesn&apos;t exist.
        </h1>
        <h3 className="text-3xl mt-16">
          Go back{" "}
          <Link
            href="/"
            className="text-blue underline underline-offset-4 hover:no-underline"
          >
            home
          </Link>
          .
        </h3>
      </div>
    </div>
  );
}
