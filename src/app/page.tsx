import Image from "next/image";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Upload, MousePointerClick, History } from "lucide-react";
// import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "crystll. | home",
};

export default function Page() {
  return (
    <div className="-mt-18 flex flex-col items-center">
      <div className="h-screen flex justify-center items-center w-350">
        <div className="w-1/2 flex flex-col justify-center items-start">
          <div className="flex flex-col w-full h-full">
            <p className="text-4xl">
              Upload. Click.{" "}
              <span className="font-semibold text-grape">Done.</span>
            </p>
            <h1 className="text-9xl mt-4">
              Yes, it&apos;s <span className="italic text-ocean">that</span>{" "}
              easy.
            </h1>
          </div>
          <h2 className="text-3xl mt-20">
            Take the first and final step towards better finance management.
          </h2>
        </div>

        <Image
          src="/logo.svg"
          width={424.86}
          height={432}
          alt="Our product's logo, a blue crystal."
          className="w-7/16 h-auto"
        />
      </div>
      {/* 
      <hr className="w-full border-1 my-30" />

      <div className="w-full px-30 flex flex-col gap-50">
        <p className="text-4xl text-center">
          Club finance management is{" "}
          <span className="text-grape italic">flawed</span>. Many clubs
          don&apos;t even track their purchases in the first place.
          <br /> <br />
          At <span className="text-ocean">crystll</span>, we&apos;re using
          software to develop the perfect solution.
        </p>
      </div>

      <div className="flex flex-col items-center w-full px-30 mt-30">
        <p className="text-6xl italic">Simply...</p>

        <div className="w-full flex justify-around items-center mt-15">
          <div className="flex flex-col justify-center items-center">
            <Upload size="5.5rem" className="text-grape" />
            <h3 className="mt-5 text-5xl text-grape">1. Upload a receipt</h3>
          </div>

          <div className="flex flex-col justify-center items-center">
            <MousePointerClick size="5.5rem" className="text-ocean" />
            <h3 className="mt-5 text-5xl text-ocean">2. Click to submit</h3>
          </div>

          <div className="flex flex-col justify-center items-center">
            <History size="5.5rem" className="text-blue" />
            <h3 className="mt-5 text-5xl text-blue">3. View purchase log</h3>
          </div>
        </div>
      </div>

      <hr className="w-full border-1 my-30" />

      <h2 className="text-6xl">
        <Link
          href="/login"
          className="text-blue underline underline-offset-10 hover:no-underline decoration-4"
        >
          Login
        </Link>{" "}
        and start using crystll today.
      </h2>

      <div className="w-full px-30 flex flex-col mt-30">
        <h2 className="text-5xl font-medium text-ocean mb-4">FAQs</h2>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is crystll free?</AccordionTrigger>
            <AccordionContent>
              Yes, crystll is completely free for all clubs at Amador Valley
              High School! If you would like to support the developers and
              project, feel free to{" "}
              <Link
                className="text-ocean underline underline-offset-4 hover:no-underline"
                href="/contact"
              >
                contact
              </Link>{" "}
              us. A paid tier will be available, however, the core features will
              still be accessible from the free tier.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Was crystll really made by a student?
            </AccordionTrigger>
            <AccordionContent>
              Yep! Crystll was developed by Dishant Bhandula, a student at
              Amador Valley High School. Check out our{" "}
              <Link
                className="text-ocean underline underline-offset-4 hover:no-underline"
                href="/about"
              >
                About
              </Link>{" "}
              page for more information.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How does crystll work? What is it?
            </AccordionTrigger>
            <AccordionContent>
              Crystll allows clubs to keep track of their finances and
              purchases. Simply upload an image of a receipt or invoice, click a
              button, and we will automatically extract all the important
              information for you.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Why do I need crystll?</AccordionTrigger>
            <AccordionContent>
              Without proper finance management, clubs lack transparency and
              accountability. Crystll allows you to be clear and sure about
              where your money is going, keeping your club&apos;s finances
              crystal clear.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Can&apos;t I just use Google Sheets?
            </AccordionTrigger>
            <AccordionContent>
              To put it simply, no. Using Google Sheets means you have to setup
              complex formulas to enable sorting, validating the entries,
              formatting, etc. All of these different things take a lot of
              research and time, neither of which are worth it. Google Sheets
              also isn&apos;t scalable. Be simple and use crystll.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              What if I still have more questions?
            </AccordionTrigger>
            <AccordionContent>
              Contact us{" "}
              <Link
                className="text-ocean underline underline-offset-4  hover:no-underline"
                href="/contact"
              >
                here
              </Link>
              !
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div> */}
    </div>
  );
}
