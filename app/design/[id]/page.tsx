"use client";

import { useRef, useEffect, useCallback } from "react";
import * as fabric from "fabric";
import { useQuery } from "convex/react";
import { redirect, useParams } from "next/navigation";
import debounce from "lodash.debounce";

import Footer from "@/components/design/Footer";
import Header from "@/components/design/header";
import Sidebar from "@/components/design/sidebar";
import { api } from "@/convex/_generated/api";
import { Tools } from "@/components/design/tools";
import { useActiveElementStore } from "@/store/ActiveEelement";
import { useCanvas } from "@/store/useCanvas";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useHistory } from "@/lib/use-history";

const Design = () => {
  const { id } = useParams();
  // const design = {};
  const design = useQuery(api.design.getDesign, { id: id as string });
  if (design === null) redirect("/dashboard");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { canvas, setCanvas } = useCanvas();
  const { activeElement, setActiveElement, setActiveElements } =
    useActiveElementStore();

  const { mutate, pending } = useApiMutation(api.design.updateDesign);
  const debouncedSave = useCallback(
    debounce((values: { json: string; height: number; width: number }) => {
      mutate(values);
    }, 500),
    [mutate]
  );

  const width = design?.width;
  const height = design?.height;
  // console.log(width, height);
  const handleStringChange = (
    property: keyof fabric.Object,
    value: string | boolean | number
  ) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set(property, value);
        if (property === "padding") activeObject.setCoords();
        canvas.requestRenderAll();
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const FabricCanvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
      width: width,
      height: height,
      backgroundColor: "#f0f0f0",
      // freeDrawingCursor:
    });

    setCanvas(FabricCanvas);

    const updateSelectedObject = () => {
      const activeObject = FabricCanvas.getActiveObject();
      if (activeObject) {
        setActiveElement(activeObject as fabric.Object & fabric.ITextProps);
      } else {
        setActiveElement(null);
      }
    };

    const updateSelectedObjects = () => {
      const selectedObjects = FabricCanvas.getActiveObjects();
      if (!selectedObjects) {
        setActiveElements(null);
      } else {
        setActiveElements(
          selectedObjects as (fabric.Object & fabric.ITextProps)[]
        ); // Store all selected objects in the state
      }
    };

    FabricCanvas.on("selection:created", updateSelectedObjects);
    FabricCanvas.on("selection:updated", updateSelectedObjects);
    FabricCanvas.on("selection:cleared", () => setActiveElements(null));

    FabricCanvas.on("selection:created", updateSelectedObject);
    FabricCanvas.on("selection:updated", updateSelectedObject);
    FabricCanvas.on("selection:cleared", updateSelectedObject);

    return () => {
      FabricCanvas.dispose();
    };
  }, [width, height]);

  handleStringChange("cornerColor", "#8B3DFF");
  handleStringChange("cornerStyle", "circle");
  handleStringChange("borderColor", "#8B3DFF");
  handleStringChange("padding", 10);
  handleStringChange("transparentCorners", false);

  return (
    <div className="h-full flex flex-col">
      <Header design={design} saving={false} />
      <div className="relative t h-[calc(100%-70px)] w-full top-[80px] flex">
        <Sidebar />
        <main className="flex-1 overflow-auto relative flex flex-col">
          {activeElement && <Tools />}
          <div
            className="flex-1 h-[calc(100%-124px)] bg-white"
            style={{ height: height, width: width }}
          >
            {/* <div
              className=" z-[60]"
            > */}
            <canvas
              ref={canvasRef}
              height={height}
              width={width}
              className="z-[]60"
            />
          </div>
          {/* </div> */}
          {/* <Footer /> */}
        </main>
      </div>
    </div>
  );
};
export default Design;
