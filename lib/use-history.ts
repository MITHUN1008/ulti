import { useCanvas } from "@/store/useCanvas";
import { useCallback, useRef, useState } from "react";

interface UseHistoryProps {
  saveCallback?: (values: {
    json: string;
    height: number;
    width: number;
  }) => void;
}

export const useHistory = ({ saveCallback }: UseHistoryProps) => {
  const [historyIndex, setHistoryIndex] = useState(0);
  const canvasHistory = useRef<string[]>([]);
  const skipSave = useRef(false);
  const { canvas } = useCanvas();

  const canUndo = useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);

  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;
  }, [historyIndex]);

  const save = useCallback(
    (skip = false) => {
      if (!canvas) return;

      const currentState = canvas.toJSON();
      const json = JSON.stringify(currentState);

      if (!skip && !skipSave.current) {
        canvasHistory.current.push(json);
        setHistoryIndex(canvasHistory.current.length - 1);
      }

      const workspace = canvas
        .getObjects()
        .find((object) => object.type === "clip");
      const height = workspace?.height || 0;
      const width = workspace?.width || 0;

      // saveCallback?.({ json, height, width });
    },
    [canvas, saveCallback]
  );

  const undo = useCallback(() => {
    if (canUndo()) {
      skipSave.current = true;
      canvas?.requestRenderAll();

      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(canvasHistory.current[previousIndex]);

      canvas?.loadFromJSON(previousState, () => {
        canvas.requestRenderAll();
        setHistoryIndex(previousIndex);
        skipSave.current = false;
      });
    }
  }, [canUndo, canvas, historyIndex]);

  const redo = useCallback(() => {
    if (canRedo()) {
      skipSave.current = true;
      canvas?.requestRenderAll();

      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(canvasHistory.current[nextIndex]);

      canvas?.loadFromJSON(nextState, () => {
        canvas?.requestRenderAll();
        setHistoryIndex(nextIndex);
        skipSave.current = false;
      });
    }
  }, [canvas, historyIndex, canRedo]);

  return {
    save,
    canUndo,
    canRedo,
    undo,
    redo,
    setHistoryIndex,
    canvasHistory,
  };
};
