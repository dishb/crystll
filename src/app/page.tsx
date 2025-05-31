import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Page() {
  return (
    <div className="-mt-16 flex flex-col items-center">
      <div className="h-screen flex justify-center items-center w-350">
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

      <div className="w-200 flex flex-col">
        <h2 className="text-3xl font-medium text-ocean">FAQs</h2>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is crystll free?</AccordionTrigger>
            <AccordionContent>
              Yes, crystll is completely free for all clubs at Amador Valley
              High School! If you would like to support the developers and
              project, feel free to{" "}
              <Link
                className="text-ocean underline underline-offset-4  hover:no-underline"
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
                className="text-ocean underline underline-offset-4  hover:no-underline"
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
              where your money is going, keeping your club's finances crystal
              clear.
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
              also isn't scalable. Be simple and use crystll.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
