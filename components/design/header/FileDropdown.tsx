import { User, UserPlus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Export from "./Export";
import { useCanvas } from "@/store/useCanvas";

import { ChangeEventHandler, useRef } from "react";

export function FileDropdown() {
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const { canvas } = useCanvas();

  const loadJson = () => {
    // const file = e.target.files?.[0];
    console.log("File:");
    // const reader = new FileReader();
    // reader.readAsText(file, "UTF-8");
    // reader.onload = () => {
    //   console.log(reader.result as string);
    //   const data = JSON.parse(reader.result as string);
    //   if (!canvas) return;
    //   canvas.loadFromJSON(data, () => {});
    // };
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="font-bold cursor-pointer">File</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:bg-dark z-[100] border-none">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <input
              type="file"
              // ref={filePickerRef}
              // hidden
              accept="image/*"
              onChange={loadJson}
            />
            <span>Load JSON</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2" />
              <span>Export</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
<<<<<<< HEAD
              <Export />
=======
              <DropdownMenuSubContent className="w-56 dark:bg-dark border-none">
                <DropdownMenuItem>
                  <MessageSquare />
                  <span>JPG</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle />
                  <span>PNG</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
