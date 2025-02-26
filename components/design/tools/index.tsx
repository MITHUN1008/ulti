import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { TbColorFilter, TbBorderCornerIos } from "react-icons/tb";
import { BsBorderWidth } from "react-icons/bs";
import {
  ArrowUp,
  ArrowDown,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash,
  SquareSplitHorizontal,
  Copy,
} from "lucide-react";
import { MdOpacity } from "react-icons/md";
import { ITextProps } from "fabric";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/global/hint";
import { Button } from "@/components/ui/button";
import Colors from "./Colors";
import HovercardGlobal from "@/components/global/HovercardGlobal";
import Opacity from "./Opacity";
import { StrokeWidth } from "./stroke-width";
import { useActiveElementStore } from "@/store/ActiveEelement";
import { useCanvas } from "@/store/useCanvas";
import Corners from "./Corners";
import TextFont from "./TextFont";
import Group from "./Group";

interface ToolbarProps {
  design: designProps | undefined;
}

export const Tools = ({ design }: ToolbarProps) => {
  const { setActiveElement, activeElement, activeElements, setActiveElements } =
    useActiveElementStore();
  const { canvas } = useCanvas();

  // Delete selected object
  const deleteSelectedObject = () => {
    if (canvas && activeElement) {
      canvas.remove(activeElement); // Remove the object from canvas
      setActiveElement(null); // Clear selection
      canvas.renderAll(); // Re-render the canvas to reflect changes
    }
    if (canvas && activeElements && activeElements.length > 1) {
      activeElements.forEach((obj) => canvas.remove(obj)); // Remove each selected object
      setActiveElements(null); // Clear selection state
      canvas.discardActiveObject(); // Deselect the group
      canvas.renderAll(); // Re-render the canvas to reflect changes
    }
  };

  // Function to handle property updates
  const updateSelectedObject = (
    property: keyof fabric.Object | keyof ITextProps | "rect",
    value: string | number | boolean | number[] | undefined
  ) => {
    if (activeElement) {
      if (activeElement.type === "rect" && property === "rect") {
        // Special case for "rect" objects with corner rounding
        activeElement.set({ rx: value, ry: value });
      }

      activeElement.set(property, value);

      canvas?.renderAll(); // Re-render the canvas

      // Update the state to trigger React reactivity
      setActiveElement(activeElement); // Clone to force update
    }
  };

  // duplicate
  const duplicateActiveObject = async () => {
    if (activeElement) {
      const Duplicate = activeElement.clone();

      // Update the state to trigger React reactivity
      canvas?.add(await Duplicate);
      setActiveElement(await Duplicate); // Clone to force update
      canvas?.renderAll(); // Re-render the canvas
    }
  };

  // bring forward
  const bringForward = () => {
    if (activeElement) {
      canvas?.bringObjectForward(activeElement);
      canvas?.renderAll(); // Re-render the canvas
    }
  };

  // send backward
  const sendBackward = () => {
    if (activeElement) {
      canvas?.sendObjectBackwards(activeElement);
    }
  };

  return (
    <div className="h-[56px] bg-white dark:bg-dark w-full flex items-center overflow-x-auto sticky top-[58px] z-[60] justify-center p-2 gap-x-2 transition-shadow duration-300 shadow-sm">
      <div className="flex items-center h-full justify-center">
        <HovercardGlobal
          trigger={
            <Hint label="Color" side="bottom" sideOffset={5}>
              <Button size="icon" variant="ghost">
                <div className="rounded-sm size-5 border-2 bg-white" />
              </Button>
            </Hint>
          }
          content={
            <Colors
              onChange={updateSelectedObject}
              value={activeElement?.fill || "#000000"}
              property="fill"
              title="Fill color"
              desc="Add Fill color to your element"
            />
          }
          side={"bottom"}
        />
      </div>

      <div className="flex items-center h-full justify-center">
        <HovercardGlobal
          trigger={
            <Hint label="Stroke color" side="bottom" sideOffset={5}>
              <Button size="icon" variant="ghost">
                <div className="rounded-sm size-5 border-2 dark:border-white border-dark" />
              </Button>
            </Hint>
          }
          content={
            <Colors
              onChange={updateSelectedObject}
              value={activeElement?.stroke || "#000000"}
              property="stroke"
              title="Stroke color"
              desc="Add stroke color to your element"
            />
          }
          side={"bottom"}
        />
      </div>

      <div className="flex items-center h-full justify-center">
        <HovercardGlobal
          trigger={
            <Hint label="Stroke width" side="bottom" sideOffset={5}>
              <Button size="icon" variant="ghost">
                <BsBorderWidth className="size-4" />
              </Button>
            </Hint>
          }
          content={<StrokeWidth onChange={updateSelectedObject} />}
          side={"bottom"}
        />
      </div>

      {activeElement && activeElement.type === "rect" && (
        <div className="flex items-center h-full justify-center">
          <HovercardGlobal
            trigger={
              <Hint label="Stroke width" side="bottom" sideOffset={5}>
                <Button size="icon" variant="ghost">
                  <TbBorderCornerIos className="size-4" />
                </Button>
              </Hint>
            }
            content={
              <Corners
                onChange={updateSelectedObject}
                value={activeElement?.rx || 0}
              />
            }
            side={"bottom"}
          />
        </div>
      )}

      {activeElement?.type === "i-text" && (
        <>
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
                  onChange={updateSelectedObject}
                  value={activeElement?.fontFamily}
                  fontSize={activeElement?.fontSize}
                />
              }
              side={"bottom"}
            />
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Bold" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  const newValue =
                    (activeElement.fontWeight as number) > 500 ? 500 : 700;
                  console.log(newValue);
                  updateSelectedObject("fontWeight", newValue);
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  (activeElement.fontWeight as number) > 500 &&
                    "bg-gray-200 dark:bg-darkHover"
                )}
              >
                <FaBold className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Italic" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  const isItalic = activeElement.fontStyle === "italic";
                  const newValue = isItalic ? "normal" : "italic";
                  updateSelectedObject("fontStyle", newValue);
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  activeElement.fontStyle === "italic" &&
                    "bg-gray-200 dark:bg-darkHover"
                )}
              >
                <FaItalic className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Underline" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  const newValue = activeElement.underline ? false : true;

                  updateSelectedObject("underline", newValue);
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  activeElement.underline && "bg-gray-200 dark:bg-darkHover"
                )}
              >
                <FaUnderline className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Strike" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  const newValue = activeElement.linethrough ? false : true;

                  updateSelectedObject("linethrough", newValue);
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  activeElement.linethrough && "bg-gray-200 dark:bg-darkHover"
                )}
              >
                <FaStrikethrough className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Align left" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  const isLeft = activeElement.textAlign === "left";
                  const newValue = isLeft ? "" : "left";
                  console.log(activeElement.textAlign);

                  updateSelectedObject("textAlign", newValue);
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  activeElement.textAlign === "left" &&
                    "bg-gray-200 dark:bg-darkHover"
                )}
              >
                <AlignLeft className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Align center" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  const isLeft = activeElement.textAlign === "center";
                  console.log(activeElement.textAlign);
                  const newValue = isLeft ? "" : "center";
                  updateSelectedObject("textAlign", newValue);
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  activeElement.textAlign === "center" &&
                    "bg-gray-200 dark:bg-darkHover"
                )}
              >
                <AlignCenter className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Align right" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  const isLeft = activeElement.textAlign === "right";
                  const newValue = isLeft ? "" : "right";
                  console.log(activeElement.textAlign);
                  updateSelectedObject("textAlign", newValue);
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  activeElement.textAlign === "right" &&
                    "bg-gray-200 dark:bg-darkHover"
                )}
              >
                <AlignRight className="size-4" />
              </Button>
            </Hint>
          </div>
        </>
      )}
      <div className="flex items-center h-full justify-center">
        <Hint label="Filters" side="bottom" sideOffset={5}>
          <Button onClick={() => {}} size="icon" variant="ghost">
            <TbColorFilter className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Remove background" side="bottom" sideOffset={5}>
          <Button onClick={() => {}} size="icon" variant="ghost">
            <SquareSplitHorizontal className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Bring forward" side="bottom" sideOffset={5}>
          <Button onClick={bringForward} size="icon" variant="ghost">
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Send backwards" side="bottom" sideOffset={5}>
          <Button onClick={sendBackward} size="icon" variant="ghost">
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Duplicate" side="bottom" sideOffset={5}>
          <Button onClick={duplicateActiveObject} size="icon" variant="ghost">
            <Copy className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <HovercardGlobal
          trigger={
            <Hint label="Opacity" side="bottom" sideOffset={5}>
              <Button size="icon" variant="ghost">
                <MdOpacity className="size-5" />
              </Button>
            </Hint>
          }
          content={
            <Opacity
              onChange={updateSelectedObject}
              value={
                activeElement?.opacity !== undefined
                  ? Math.round(activeElement.opacity * 100)
                  : 100
              }
              property="opacity"
              title="Opacity"
              desc="Change the opacity of the selected object"
            />
          }
          side={"bottom"}
        />
      </div>

      {activeElement?.type === "group" && <Group />}
      {activeElements!.length > 1 && <Group />}
      <div className="flex items-center h-full justify-center">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button
            onClick={deleteSelectedObject}
            size="icon"
            variant="ghost"
            className="text-red-600"
          >
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
