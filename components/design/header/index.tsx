
import UserButton from "@/components/global/UserButton";
import DesignInput from "@/components/design/header/DesignInput";
import { FileDropdown } from "./FileDropdown";
import { Button } from "@/components/ui/button";
import PublishModal from "@/components/modal/PublishModal";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { localAPI } from "@/lib/localStorageAPI";

import Image from "@/src/components/ReactImage";
import Link from "@/src/components/ReactLink";
import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { MdRedo, MdUndo } from "react-icons/md";
import { Hint } from "@/components/global/hint";
import { designProps } from "@/type";

const Header = ({ design }: { design: designProps | null | undefined }) => {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const { isOnline } = useNetworkStatusStore();

  const handleSave = async () => {
    if (!design) return;
    setPending(true);
    try {
      // Save design using localStorage API
      localAPI.updateDesign(design._id, {
        json: design.json,
        thumbnailUrl: design.thumbnailUrl,
      });
    } catch (error) {
      console.error("Error saving design:", error);
    } finally {
      setPending(false);
    }
  };

  // Simple undo/redo state
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const undo = () => {
    // Basic undo functionality - can be enhanced later
    console.log("Undo functionality");
  };

  const redo = () => {
    // Basic redo functionality - can be enhanced later
    console.log("Redo functionality");
  };

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
          <FileDropdown />
          <Hint label="Undo">
            <Button
              onClick={() => undo()}
              disabled={!canUndo || !isOnline}
              variant={"ghost"}
              size={"icon"}
            >
              <MdUndo className="size-5" />
            </Button>
          </Hint>
          <Hint label="redo">
            <Button
              onClick={() => redo()}
              disabled={!canRedo || !isOnline}
              variant={"ghost"}
              size={"icon"}
            >
              <MdRedo className="size-5" />
            </Button>
          </Hint>
          {pending && <ImSpinner6 className="size-6 animate-spin" />}
        </div>
        <div className="flex gap-2 items-center">
          <Button onClick={() => setOpen(true)} disabled={!isOnline}>
            Publish
          </Button>
          <DesignInput name={design?.title} id={design?._id} />
          <UserButton />
        </div>
      </div>
    </>
  );
};

export default Header;
