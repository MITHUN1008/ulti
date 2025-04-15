import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { ChevronDown, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { ITextProps } from "fabric";
<<<<<<< HEAD
import * as fabric from "fabric";
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1

import { cn } from "@/lib/utils";
import { Hint } from "@/components/global/hint";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { useActiveElementStore } from "@/store/ActiveEelement";
import HovercardGlobal from "@/components/global/HovercardGlobal";
import TextFont from "./TextFont";

const Text = ({
  updateSelectedText,
}: {
  updateSelectedText: (
=======
import HovercardGlobal from "@/components/global/HovercardGlobal";
import { useActiveElementStore } from "@/store/ActiveEelement";
import TextFont from "./TextFont";

const Text = ({
  updateSelectedObject,
}: {
  updateSelectedObject: (
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
    property: keyof fabric.Object | keyof ITextProps | "rect",
    value: string | number | boolean | number[] | undefined
  ) => void;
}) => {
  const { activeElement } = useActiveElementStore();
  return (
    <>
<<<<<<< HEAD
      {/* Font */}
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
      <div className="flex items-center h-full justify-center">
        <HovercardGlobal
          trigger={
            <Hint label="Font" side="bottom" sideOffset={5}>
              <Button
                size="icon"
                variant="ghost"
                className={cn("w-auto px-2 text-sm")}
              >
                <div className="max-w-[100px] truncate">
                  {activeElement?.fontFamily}
                </div>
                <ChevronDown className="size-4 ml-2 shrink-0" />
              </Button>
            </Hint>
          }
          content={
            <TextFont
<<<<<<< HEAD
              onChange={updateSelectedText}
=======
              onChange={updateSelectedObject}
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
              value={activeElement?.fontFamily}
              fontSize={activeElement?.fontSize}
            />
          }
          side={"bottom"}
        />
      </div>
<<<<<<< HEAD
      {/* fontWeight */}
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
      <div className="flex items-center h-full justify-center">
        <Hint label="Bold" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const newValue =
                (activeElement?.fontWeight as number) > 500 ? 500 : 700;
<<<<<<< HEAD
              // console.log(newValue);
              updateSelectedText("fontWeight", newValue);
=======
              console.log(newValue);
              updateSelectedObject("fontWeight", newValue);
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
            }}
            size="icon"
            variant="ghost"
            className={cn(
              (activeElement?.fontWeight as number) > 500 &&
                "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <FaBold className="size-4" />
          </Button>
        </Hint>
      </div>

<<<<<<< HEAD
      {/* fontStyle => normal or italic */}
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
      <div className="flex items-center h-full justify-center">
        <Hint label="Italic" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const isItalic = activeElement?.fontStyle === "italic";
              const newValue = isItalic ? "normal" : "italic";
<<<<<<< HEAD
              updateSelectedText("fontStyle", newValue);
=======
              updateSelectedObject("fontStyle", newValue);
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.fontStyle === "italic" &&
                "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <FaItalic className="size-4" />
          </Button>
        </Hint>
      </div>

<<<<<<< HEAD
      {/* Underline */}
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
      <div className="flex items-center h-full justify-center">
        <Hint label="Underline" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const newValue = activeElement?.underline ? false : true;

<<<<<<< HEAD
              updateSelectedText("underline", newValue);
=======
              updateSelectedObject("underline", newValue);
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.underline && "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <FaUnderline className="size-4" />
          </Button>
        </Hint>
      </div>

<<<<<<< HEAD
      {/* Strike */}
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
      <div className="flex items-center h-full justify-center">
        <Hint label="Strike" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const newValue = activeElement?.linethrough ? false : true;

<<<<<<< HEAD
              updateSelectedText("linethrough", newValue);
=======
              updateSelectedObject("linethrough", newValue);
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.linethrough && "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <FaStrikethrough className="size-4" />
          </Button>
        </Hint>
      </div>

<<<<<<< HEAD
      {/* Align left */}
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
      <div className="flex items-center h-full justify-center">
        <Hint label="Align left" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const isLeft = activeElement?.textAlign === "left";
              const newValue = isLeft ? "" : "left";
<<<<<<< HEAD
              // console.log(activeElement?.textAlign);

              updateSelectedText("textAlign", newValue);
=======
              console.log(activeElement?.textAlign);

              updateSelectedObject("textAlign", newValue);
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.textAlign === "left" &&
                "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <AlignLeft className="size-4" />
          </Button>
        </Hint>
      </div>

<<<<<<< HEAD
      {/* Align center */}
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
      <div className="flex items-center h-full justify-center">
        <Hint label="Align center" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const isLeft = activeElement?.textAlign === "center";
<<<<<<< HEAD
              // console.log(activeElement?.textAlign);
              const newValue = isLeft ? "" : "center";
              updateSelectedText("textAlign", newValue);
=======
              console.log(activeElement?.textAlign);
              const newValue = isLeft ? "" : "center";
              updateSelectedObject("textAlign", newValue);
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.textAlign === "center" &&
                "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <AlignCenter className="size-4" />
          </Button>
        </Hint>
      </div>

<<<<<<< HEAD
      {/* Align right */}
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
      <div className="flex items-center h-full justify-center">
        <Hint label="Align right" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const isLeft = activeElement?.textAlign === "right";
              const newValue = isLeft ? "" : "right";
<<<<<<< HEAD
              // console.log(activeElement?.textAlign);
              updateSelectedText("textAlign", newValue);
=======
              console.log(activeElement?.textAlign);
              updateSelectedObject("textAlign", newValue);
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.textAlign === "right" &&
                "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <AlignRight className="size-4" />
          </Button>
        </Hint>
      </div>
    </>
  );
};

export default Text;
