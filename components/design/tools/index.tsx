import { TbColorFilter, TbBorderCornerIos } from "react-icons/tb";
import { BsBorderWidth } from "react-icons/bs";
import { ArrowUp, ArrowDown, Copy, Trash } from "lucide-react";
import { MdOpacity } from "react-icons/md";
import { ITextProps } from "fabric";
import * as fabric from "fabric";
import { TbBackground } from "react-icons/tb";

import { useCanvas } from "@/store/useCanvas";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useActiveElementStore } from "@/store/ActiveEelement";
import { Hint } from "@/components/global/hint";
import Colors from "./Colors";
import HovercardGlobal from "@/components/global/HovercardGlobal";
import Opacity from "./Opacity";
import { StrokeWidth } from "./stroke-width";
import Corners from "./Corners";
import Group from "./Group";
import ImageFilters from "./ImageFilters";
import Text from "./Text";
<<<<<<< HEAD
import ImageRadius from "./ImageRadius";
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1

export const Tools = () => {
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

  // This function sets the background image of the canvas to the currently selected image
  const addImage = async () => {
    if (!canvas) return;

    // @ts-ignore
    const imageUrl = activeElement?._originalElement.currentSrc;
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const fabricImage = new fabric.FabricImage(image, {
        // We'll scale it below after creating the object
        originX: "left",
        originY: "top",
      });

      // Scale image to fit the canvas size
      const scaleX = canvas.width! / fabricImage.width!;
      const scaleY = canvas.height! / fabricImage.height!;
      fabricImage.scaleX = scaleX;
      fabricImage.scaleY = scaleY;

      canvas.backgroundImage = fabricImage;
      canvas?.requestRenderAll();
    };
  };

  return (
    <ScrollArea className=" mb-4">
<<<<<<< HEAD
      <div className="justify-center items-center flex space-x-2">
=======
      <div className="mx-[20px] flex space-x-2">
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
        {/* Color */}
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
        {/* Stroke color */}
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
        {/* Stroke width */}
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
        {/* rect */}
        {activeElement?.type === "rect" && (
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

        {/* Add text */}
        {activeElement?.type === "textbox" && (
<<<<<<< HEAD
          <Text updateSelectedText={updateSelectedObject} />
        )}
        {activeElement?.type === "i-text" && (
          <Text updateSelectedText={updateSelectedObject} />
        )}

        {/* imge */}
=======
          <Text updateSelectedObject={updateSelectedObject} />
        )}
        {activeElement?.type === "i-text" && (
          <Text updateSelectedObject={updateSelectedObject} />
        )}

        {/* image */}
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
        {activeElement?.type === "image" && (
          <div className="flex items-center h-full justify-center">
            <HovercardGlobal
              trigger={
<<<<<<< HEAD
                <Hint label="Stroke width" side="bottom" sideOffset={5}>
                  <Button size="icon" variant="ghost">
                    <TbBorderCornerIos className="size-4" />
                  </Button>
                </Hint>
              }
              content={<ImageRadius />}
=======
                <Hint label="Filters" side="bottom" sideOffset={5}>
                  <Button size="icon" variant="ghost">
                    <TbColorFilter className="size-4" />
                  </Button>
                </Hint>
              }
              content={<ImageFilters />}
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
              side={"bottom"}
            />
          </div>
        )}
<<<<<<< HEAD

        {activeElement?.type === "image" && (
          <>
            <div className="flex items-center h-full justify-center">
              <HovercardGlobal
                trigger={
                  <Hint label="Filters" side="bottom" sideOffset={5}>
                    <Button size="icon" variant="ghost">
                      <TbColorFilter className="size-4" />
                    </Button>
                  </Hint>
                }
                content={<ImageFilters />}
                side={"bottom"}
              />
            </div>
            <div className="flex items-center h-full justify-center">
              <Hint label="Image Background" side="bottom" sideOffset={5}>
                <Button size="icon" variant="ghost" onClick={addImage}>
                  <TbBackground className="size-4" />
                </Button>
              </Hint>
            </div>
          </>
        )}
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
        {/* Bring forward */}
        <div className="flex items-center h-full justify-center">
          <Hint label="Bring forward" side="bottom" sideOffset={5}>
            <Button onClick={bringForward} size="icon" variant="ghost">
              <ArrowUp className="size-4" />
            </Button>
          </Hint>
        </div>
        {/* Send backwards */}
        <div className="flex items-center h-full justify-center">
          <Hint label="Send backwards" side="bottom" sideOffset={5}>
            <Button onClick={sendBackward} size="icon" variant="ghost">
              <ArrowDown className="size-4" />
            </Button>
          </Hint>
        </div>
        {/* Duplicate */}
        <div className="flex items-center h-full justify-center">
          <Hint label="Duplicate" side="bottom" sideOffset={5}>
            <Button onClick={duplicateActiveObject} size="icon" variant="ghost">
              <Copy className="size-4" />
            </Button>
          </Hint>
        </div>
        {/* Opacity */}
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
<<<<<<< HEAD
=======
                title="Opacity"
                desc="Change the opacity of the selected object"
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
              />
            }
            side={"bottom"}
          />
        </div>
        {/* Group */}
        {activeElement?.type === "group" && <Group />}
        {activeElements!.length > 1 && <Group />}
<<<<<<< HEAD
        {/* delete */}
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
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
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
