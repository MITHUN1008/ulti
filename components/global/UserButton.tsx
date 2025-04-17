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
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { usePricingStore } from "@/store/PricingStore";

import { useAuthActions } from "@convex-dev/auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { MdLogout, MdOutlinePriceCheck } from "react-icons/md";

const UserButton = () => {
  const { setTheme, theme } = useTheme();
  const { setIsPricing } = usePricingStore();
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { data } = useCurrentUser();

  const logout = () => {
    router.push("/");
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-12 items-center rounded-lg">
          <AvatarImage
            src={data?.image}
            alt={data?.name?.charAt(0).toUpperCase()}
          />
          <AvatarFallback className="rounded-lg">
            {data?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 dark:bg-dark z-[70] border-none">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="font-">
            {theme === "light" ? (
              <IoSunnyOutline className="mr-2" />
            ) : (
              <FaMoon className="mr-2" />
            )}
            <span className="capitalize">{theme}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-40 dark:bg-dark z-[70] border-none">
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
