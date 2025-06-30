export default function NotFound() {
  return (
    <div className="min-h-screen -mt-18 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-start w-[90%] md:w-[80%] lg:w-[50%]">
        <h2 className="text-xl md:text-4xl">
          <span className="text-grape font-medium">404</span>: Page Not Found.
        </h2>
        <h1 className="mt-1 text-4xl leading-12 md:mt-4 md:text-7xl md:leading-20 lg:leading-28 lg:text-8xl">
          <span className="text-ocean italic">Whoops!</span> Looks like this
          page doesn&apos;t exist.
        </h1>
      </div>
    </div>
  );
}
