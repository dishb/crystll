import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type AccountMenuProps from "@/types/accountMenuProps";
import { Open_Sans } from "next/font/google";
import Link from "next/link";
import { Bolt, LogOut } from "lucide-react";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function AccountMenu({ userImage, userName }: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="border shadow-xs w-10 h-10 hover:cursor-pointer">
          <AvatarImage src={userImage ?? undefined} />
          <AvatarFallback>
            {userName
              ? userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "?"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className={openSans.className}>
          My account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`${openSans.className} hover:cursor-pointer flex w-full items-center gap-2`}
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="destructive"
        >
          <LogOut /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
