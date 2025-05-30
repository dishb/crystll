import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="flex-1 w-350 flex justify-center tems-center">
        <div className="w-1/2 flex flex-col justify-center items-start">
          <h2 className="text-4xl">
            Upload. Click. <span className="font-medium text-grape">Done.</span>
          </h2>
          <h1 className="text-9xl mt-4">
            Yes, it&apos;s <span className="italic text-ocean">that</span> easy.
          </h1>
        </div>

        <Image
          src="/logo.svg"
          width={424.86}
          height={432}
          alt="Our product's logo, a blue crystal."
          className="w-7/16 h-auto"
        />
      </div>
    </div>
  );
}
