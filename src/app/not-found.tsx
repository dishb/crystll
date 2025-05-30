export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-col justify-center items-start">
        <h2 className="text-4xl">
          <span className="text-grape font-medium">404</span>: Page Not Found.
        </h2>
        <h1 className="text-8xl leading-28 mt-4">
          <span className="text-ocean italic">Whoops!</span> Looks like this
          page doesn&apos;t exist.
        </h1>
      </div>
    </div>
  );
}
