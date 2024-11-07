import * as fabric from "fabric";
import { PiTextTBold } from "react-icons/pi";

import { useCanvas } from "@/store/useCanvas";
import { Button } from "@/components/ui/button";
import { ToolHeader } from "@/components/global/tool-header";

const Text = () => {
  const { canvas } = useCanvas();

  type TextStyle = "heading" | "subheading" | "small";

  const addText = (text: string, style: TextStyle) => {
    // Set default options
    let options: any = {
      left: 100, // X position
      top: 100, // Y position
      fontFamily: "serif", // Font family
      fill: "#333333", // Text color
      selectable: true, // Allow selection and editing
      fontStyle: "normal",
      linethrough: false,
      underline: false,
      textAlign: "left",
    };

    // Modify options based on text style
    switch (style) {
      case "heading":
        options = { ...options, fontSize: 36, fontWeight: 500 };
        break;
      case "subheading":
        options = { ...options, fontSize: 24, fontWeight: 200 };
        break;
      case "small":
        options = { ...options, fontSize: 14, fontWeight: 100 };
        break;
    }

    // Create the text object with specified options
    const textObject = new fabric.IText(text, options);

    if (canvas) {
      canvas.add(textObject); // Add the text object to the canvas
      canvas.setActiveObject(textObject); // Set the text as the active object (optional)
      canvas.renderAll(); // Re-render the canvas
    }
  };

  return (
    <div className="flex flex-col sa space-y-2">
      <ToolHeader title="Text" description="Addd text to your design" />
      <Button>
        <PiTextTBold className="mr-2" />
        Add Text Box
      </Button>
      <h2 className="font-semibold text-xs">Default Text Styles</h2>
      <Button
        variant={"ghost"}
        className="border border-gray-400 dark:border-zinc-700 font-extrabold text-3xl"
        onClick={() => addText("Added a heading", "heading")}
      >
        Add a heading
      </Button>
      <Button
        variant={"ghost"}
        className="border border-gray-400 dark:border-zinc-700 font-bold text-lg"
        onClick={() => addText("Added a subheading", "subheading")}
      >
        Add a subheading
      </Button>
      <Button
        variant={"ghost"}
        className="border border-gray-400 dark:border-zinc-700"
        onClick={() => addText("Added a little bit of body text", "small")}
      >
        Add a little bit of body text
      </Button>
    </div>
  );
};

export default Text;
