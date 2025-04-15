import { ToolHeader } from "@/components/global/tool-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCanvas } from "@/store/useCanvas";
import Colors from "@/components/design/tools/Colors";

import { useState } from "react";

const Setting = () => {
  const { canvas } = useCanvas();
  if (!canvas) return null;

  const [width, setWidth] = useState<number>(1240);
  const [height, setHeight] = useState<number>(720);
  // choose color
  const chooseColor = (property: string, value: string) => {
    // console.log(value);
    canvas.backgroundColor = value;
    canvas.renderAll();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(width, height);
    canvas.width = width!;
    canvas.height = height!;
    canvas.renderAll();
  };

  return (
    <div className="relative flex flex-col">
      <ToolHeader
        title="Settings"
        description="Change the look of your workspace"
      />
      <ScrollArea className="h-[70vh]">
        <form onSubmit={onSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              placeholder="Height"
              value={height}
              required
              type="number"
              className="bg-transparent dark:bg-transparent border border-gray-400 dark:border-zinc-700"
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              placeholder="Width"
              value={width}
              type="number"
              required
              className="bg-transparent dark:bg-transparent border border-gray-400 dark:border-zinc-700"
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>
          <Button className="w-full" type="submit">
            Resize
          </Button>
        </form>
        <div className="p-4">
          <Colors
            title="Choose Background Color"
            desc="Choose the Background color that you would like to use"
            onChange={chooseColor}
            property="backgroundColor"
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Setting;
