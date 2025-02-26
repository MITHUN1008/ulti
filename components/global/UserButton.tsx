import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePricingStore } from "@/store/PricingStore";

import { useAuthActions } from "@convex-dev/auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { MdLogout, MdOutlinePriceCheck } from "react-icons/md";

const UserButton = ({ image, name }: { image: string; name: string }) => {
  const { setTheme, theme } = useTheme();
  const { setIsPricing } = usePricingStore();
  const { signOut } = useAuthActions();
  const router = useRouter();

  const logout = () => {
    router.push("/");
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={image} alt={name?.charAt(0).toUpperCase()} />
          <AvatarFallback className="rounded-lg">
            {name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 dark:bg-dark z-[70]">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="font-">
            {theme === "light" ? <IoSunnyOutline /> : <FaMoon />}
            {theme}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-40 dark:bg-dark z-[70]">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={theme === "system"}
                onCheckedChange={() => setTheme("system")}
              >
                System
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={theme === "dark"}
                onCheckedChange={() => setTheme("dark")}
              >
                Dark
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={theme === "light"}
                onCheckedChange={() => setTheme("light")}
              >
                Light
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={() => setIsPricing(true)}>
          <MdOutlinePriceCheck />
          Plans & Pricing
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <MdLogout />
          Signout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
