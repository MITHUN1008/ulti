import { useCurrentUser } from "@/fetch/useCurrentUser";
import UserButton from "@/components/global/UserButton";
import DesignInput from "@/components/design/header/DesignInput";
import { FileDropdown } from "./FileDropdown";
import { Button } from "@/components/ui/button";
import useCanvasHistory from "@/lib/canvasHistory";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import PublishModal from "@/components/modal/PublishModal";

import Image from "next/image";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa6";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
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
  const { mutate, pending } = useApiMutation(api.design.updateTitle);
  const { canRedo, canUndo, redo, undo } = useCanvasHistory();

  const debouncedSave = useCallback(
    debounce((values: { json: string; height: number; width: number }) => {
      mutate(values);
    }, 500),
    [mutate]
  );

  // console.log(canvasHistory);
  return (
    <>
      <PublishModal open={open} setOpen={setOpen} design={design} />
      <div className="design-header">
        <div className="flex text-center gap-4">
          <Link href={"/"}>
            <Image src={"/logo.png"} alt="logo" height={80} width={80} />
          </Link>
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
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Publish</Button>
          <DesignInput name={design?.title} id={design?._id} />
          {data && <UserButton image={data.image!} name={data.name!} />}
        </div>
      </div>
    </>
  );
};

export default Header;
