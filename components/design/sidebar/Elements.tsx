import { FaRegCircle } from "react-icons/fa6";
import { IoTriangleOutline } from "react-icons/io5";
import { LuDiamond } from "react-icons/lu";
import { BiRectangle } from "react-icons/bi";
import * as fabric from "fabric";

import ElementCard from "./ElementCard";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
} from "@/type/types";
import { ToolHeader } from "@/components/global/tool-header";

const Elements = ({ canvas }: { canvas: fabric.Canvas | null }) => {
  const addRect = (canvas?: fabric.Canvas) => {
    const rect = new fabric.Rect({
      ...RECTANGLE_OPTIONS,
    });
    canvas?.add(rect);
    canvas?.setActiveObject(rect); // Set the text as the active object (optional)
    canvas?.requestRenderAll();
  };

  const addCirle = (canvas?: fabric.Canvas) => {
    const circle = new fabric.Circle({
      ...CIRCLE_OPTIONS,
    });
    canvas?.add(circle);
    canvas?.setActiveObject(circle); // Set the text as the active object (optional)
    canvas?.requestRenderAll();
  };

  const addTriangle = (canvas?: fabric.Canvas) => {
    const Triangle = new fabric.Triangle({
      ...TRIANGLE_OPTIONS,
    });
    canvas?.add(Triangle);
    canvas?.setActiveObject(Triangle); // Set the text as the active object (optional)
    canvas?.requestRenderAll();
  };

  const addDiamond = (canvas?: fabric.Canvas) => {
    const points = [
      { x: 0, y: -50 },
      { x: 50, y: 0 },
      { x: 0, y: 50 },
      { x: -50, y: 0 },
    ];
    const Polygon = new fabric.Polygon(points, {
      ...DIAMOND_OPTIONS,
    });
    canvas?.add(Polygon);
    canvas?.setActiveObject(Polygon); // Set the text as the active object (optional)
    canvas?.requestRenderAll();
  };

  return (
    <div className="flex flex-col space-y-2">
      <ToolHeader
        title="Elements"
        description="Addd elemnents to your design"
      />
      <div className="flex gap-2">
        <ElementCard
          onClick={() => canvas && addRect(canvas)}
          Icon={BiRectangle}
          Text="Rectangle"
        />
        <ElementCard
          onClick={() => canvas && addCirle(canvas)}
          Icon={FaRegCircle}
          Text="Circle"
        />

        <ElementCard
          onClick={() => canvas && addTriangle(canvas)}
          Icon={IoTriangleOutline}
          Text="Triangle"
        />
        <ElementCard
          onClick={() => canvas && addDiamond(canvas)}
          Icon={LuDiamond}
          Text="Diamond"
        />
      </div>
    </div>
  );
};

export default Elements;
