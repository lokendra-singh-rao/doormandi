import { signOut } from "@/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UserCircle } from "lucide-react";

export const ProfileDropdown = async () => {
  const handleSignOut = async () => {
    try {
      await signOut({
        redirect: true,
        redirectTo: "/login",
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <UserCircle size={32} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[999]" align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Orders</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
