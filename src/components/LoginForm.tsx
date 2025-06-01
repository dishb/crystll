import { signIn } from "@/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 -mt-16", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Use one of the providers below to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <div className="flex flex-col">
              <Button variant="outline" type="submit" className="w-full">
                <SiGithub />
                Sign in with GitHub
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
