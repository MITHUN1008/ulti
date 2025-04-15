import { useCurrentUser } from "@/fetch/useCurrentUser";
import UserButton from "@/components/global/UserButton";
import DesignInput from "@/components/design/header/DesignInput";
import { FileDropdown } from "./FileDropdown";
import { Button } from "@/components/ui/button";
import useCanvasHistory from "@/lib/canvasHistory";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import PublishModal from "@/components/modal/PublishModal";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { useCanvas } from "@/store/useCanvas";

import Image from "next/image";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { ImSpinner6 } from "react-icons/im";
import { MdRedo, MdUndo } from "react-icons/md";

const Header = ({
  design,
  saving,
}: {
  design: designProps | null | undefined;
  saving: boolean;
}) => {
  const { data } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const { mutate, pending } = useApiMutation(api.design.updateDesign);
  const { canRedo, canUndo, redo, undo } = useCanvasHistory();
  const { isOnline } = useNetworkStatusStore();
  const { canvas } = useCanvas();

  const save = async () => {
    if (!canvas) return;
    await mutate({
      id: design?._id,
      json: canvas.toJSON(),
      thumbnailUrl: canvas.toDataURL({ format: "png", multiplier: 1 }),
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    if (!canvas) return;
    const debouncedSave = debounce(() => {
      save();
    }, 500);
    // Listen to changes
    canvas.on("object:modified", debouncedSave);
    canvas.on("object:added", debouncedSave);
    canvas.on("object:removed", debouncedSave);

    // Cleanup on unmount
    return () => {
      canvas.off("object:modified", debouncedSave);
      canvas.off("object:added", debouncedSave);
      canvas.off("object:removed", debouncedSave);
    };
  }, [canvas]);

  // console.log(canvasHistory);
  return (
    <>
      <PublishModal open={open} setOpen={setOpen} design={design} />
      <div className="design-header">
        <div className="flex text-center gap-4 items-center">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              height={80}
              width={80}
              className="size-auto"
            />
          </Link>
          {pending && <ImSpinner6 className="size-7 animate-spin" />}
          <FileDropdown />
          <Button
            onClick={() => undo()}
            disabled={!canUndo}
            variant={"ghost"}
            size={"icon"}
          >
            <MdUndo className="size-5" />
          </Button>
          <Button
            onClick={() => redo()}
            disabled={!canRedo}
            variant={"ghost"}
            size={"icon"}
          >
            <MdRedo className="size-5" />
          </Button>
          {saving && <FaSpinner className="animate-spin size-5" />}
        </div>
        <div className="flex gap-2 items-center">
          <Button onClick={() => setOpen(true)} disabled={!isOnline}>
            Publish
          </Button>
          <DesignInput name={design?.title} id={design?._id} />
          {data && <UserButton image={data.image!} name={data.name!} />}
        </div>
      </div>
    </>
  );
};

export default Header;
