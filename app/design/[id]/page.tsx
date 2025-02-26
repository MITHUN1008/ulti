"use client";

import { useRef, useEffect } from "react";
import * as fabric from "fabric";
import { useQuery } from "convex/react";
import { redirect, useParams } from "next/navigation";

import Footer from "@/components/design/Footer";
import Header from "@/components/design/header";
import Sidebar from "@/components/design/sidebar";
import { api } from "@/convex/_generated/api";
import { Tools } from "@/components/design/tools";
import { useActiveElementStore } from "@/store/ActiveEelement";
import { useCanvas } from "@/store/useCanvas";
import { useApiMutation } from "@/hooks/use-api-mutation";

const Design = () => {
  const { id } = useParams();
  const design = useQuery(api.design.getDesign, { id: id as string });
  if (design === null) redirect("/dashboard");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { canvas, setCanvas } = useCanvas();
  const { activeElement, setActiveElement, setActiveElements } =
    useActiveElementStore();
  const { mutate, pending } = useApiMutation(api.design.updateDesign);

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
      backgroundColor: "white",
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

  const saveWork = async () => {
    // if (!design?._id) return;
    // const thumbnailUrl = canvas?.toDataURL({
    //   format: "png",
    //   quality: 0.8,
    //   multiplier: 0.5,
    // });
    // await mutate({
    //   id: design?._id,
    //   json: canvas?.toJSON(),
    //   thumbnailUrl: thumbnailUrl,
    // }).catch((error) => {
    //   console.log(error);
    // });
  };

  // const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  // useEffect(() => {
  //   if (canvas && design?.json && !isCanvasLoaded) {
  //     canvas.loadFromJSON(design.json, () => {
  //       // console.log("Canvas loaded from JSON string");
  //       setIsCanvasLoaded(true); // Mark canvas as loaded
  //     });
  //     // Load JSON into the canvas
  //   }
  //   if (design?.json !== canvas?.toJSON()) {
  //     saveWork();
  //   }
  //   canvas?.renderAll();
  // }, [canvas, design?.json, isCanvasLoaded, canvas?.toJSON()]);

  return (
    <div>
      <Header design={design} saving={false} />
      <Sidebar />
      {activeElement && <Tools design={design} />}
      <div className="items-center justify-center flex flex-col">
        <div
          className="mt-10 shadow-lg bg-gray-100"
          style={{ height: height, width: width }}
        >
          <canvas ref={canvasRef} width={width} height={height} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Design;
