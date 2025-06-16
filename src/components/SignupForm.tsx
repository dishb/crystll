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

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Use your club&apos;s official email to create an account with
            Google.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/setup" });
            }}
          >
            <div className="flex flex-col">
              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                variant="outline"
              >
                <SiGoogle />
                Sign up with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
