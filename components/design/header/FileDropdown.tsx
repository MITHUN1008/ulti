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

import { useRef } from "react";
import { CiImport, CiExport } from "react-icons/ci";
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
            <CiImport />
            <span>Load JSON</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <CiExport className="mr-2" />
              <span>Export</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <Export />
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
