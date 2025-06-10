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
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Use your club&apos;s official email to sign in with Google.
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
                className="w-full hover:cursor-pointer"
                variant="outline"
              >
                <SiGoogle />
                Sign in with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
