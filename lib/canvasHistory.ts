import { useCanvas } from "@/store/useCanvas";
import { useEffect, useState } from "react";

const useCanvasHistory = () => {
  const { canvas } = useCanvas();

<<<<<<< HEAD
  const [canvasState, setCanvasState] = useState<string[]>([]);
=======
  const [canvasState, setCanvasState] = useState([]);
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
  const [currentStateIndex, setCurrentStateIndex] = useState(-1);

  useEffect(() => {
    if (!canvas) return;

    const updateCanvasState = () => {
      const jsonData = JSON.stringify(canvas.toJSON());

      setCanvasState((prev) => {
        const newStates = [...prev.slice(0, currentStateIndex + 1), jsonData];
        setCurrentStateIndex(newStates.length - 1);
        return newStates;
      });
    };

    canvas.on("object:added", updateCanvasState);
    canvas.on("object:modified", updateCanvasState);

    return () => {
      canvas.off("object:added", updateCanvasState);
      canvas.off("object:modified", updateCanvasState);
    };
  }, [canvas, currentStateIndex]);

  const undo = () => {
    if (currentStateIndex > 0) {
      const newIndex = currentStateIndex - 1;
      canvas?.loadFromJSON(canvasState[newIndex], () => {
        canvas.renderAll();
        setCurrentStateIndex(newIndex);
      });
<<<<<<< HEAD
      canvas?.renderAll();
      canvas?.requestRenderAll();
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
    }
  };

  const redo = () => {
    if (currentStateIndex < canvasState.length - 1) {
      const newIndex = currentStateIndex + 1;
      canvas?.loadFromJSON(canvasState[newIndex], () => {
        canvas.renderAll();
        setCurrentStateIndex(newIndex);
      });
<<<<<<< HEAD
      canvas?.renderAll();
      canvas?.requestRenderAll();
=======
>>>>>>> 07eb10da9bf9fb4e10a3f252977cdd3d721286f1
    }
  };

  return {
    undo,
    redo,
    canUndo: currentStateIndex > 0,
    canRedo: currentStateIndex < canvasState.length - 1,
  };
};

export default useCanvasHistory;
