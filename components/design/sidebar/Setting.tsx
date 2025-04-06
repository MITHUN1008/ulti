import { ToolHeader } from "@/components/global/tool-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCanvas } from "@/store/useCanvas";
import Colors from "@/components/design/tools/Colors";

const Setting = () => {
  const { canvas } = useCanvas();
  if (!canvas) return null;

  // choose color
  const chooseColor = (property: string, value: string) => {
    // console.log(value);
    if (!canvas?.freeDrawingBrush) return;
    canvas.freeDrawingBrush.color = value;
    canvas.renderAll();
  };

  const onChange = () => {
    // canvas?.backgroundImage("")
    // canvas?.backgroundColor("")
  };

  return (
    <div className="relative flex flex-col">
      <ToolHeader
        title="Settings"
        description="Change the look of your workspace"
      />
      <ScrollArea className="h-[70vh]">
        <form
          className="space-y-4 p-4"
          // onSubmit={onSubmit}
        >
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              placeholder="Height"
              // value={height}
              type="number"
              className="bg-transparent dark:bg-transparent border border-gray-400 dark:border-zinc-700"
              // onChange={(e) => changeHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              placeholder="Width"
              // value={width}
              type="number"
              className="bg-transparent dark:bg-transparent border border-gray-400 dark:border-zinc-700"
              // onChange={(e) => changeWidth(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
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
