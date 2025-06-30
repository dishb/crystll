import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center">
      <hr className="border-1" />
      <div className="flex flex-col justify-around items-center py-12">
        <div className="flex justify-center items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Our product's logo, a blue crystal."
            width={35.4}
            height={36}
            className="w-14 h-auto md:w-18"
          />
          <h2 className="text-xl md:text-5xl">crystll.</h2>
        </div>

        <p className="mt-8 text-lg md:text-2xl">
          &copy; 2025 Dishant Bhandula. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
