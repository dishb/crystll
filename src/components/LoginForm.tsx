import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { Open_Sans } from "next/font/google";
import Link from "next/link";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-grape">
            Login
          </CardTitle>
          <CardDescription className={openSans.className}>
            Use your club&apos;s official email to sign in to your account with
            Google.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <div className="flex flex-col">
              <Button
                type="submit"
                className={`w-full hover:cursor-pointer ${openSans.className}`}
                variant="outline"
              >
                <SiGoogle className="text-ocean" />
                Sign in with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 w-full flex flex-col justify-center items-center gap-4">
            <p>
              Dont&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="underline hover:no-underline text-ocean font-semibold underline-offset-3"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
