"use client";

import { useCurrentUser } from "@/fetch/useCurrentUser";
import UserButton from "@/components/global/UserButton";
import DesignInput from "@/components/design/header/DesignInput";
import { FileDropdown } from "./FileDropdown";

import Image from "next/image";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa6";

const Header = ({
  design,
  saving,
}: {
  design: designProps | null | undefined;
  saving: boolean;
}) => {
  const { data } = useCurrentUser();
  //   console.log(design);
  return (
    <div className="flex justify-between dark:border-b p-3 shadow-lg sticky top-0 bg-gradient-to-r from-[#01DEE3] to-[#7D2AE8] text-white z-[60]">
      <div className="flex text-center gap-4 items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="logo" height={80} width={80} />
        </Link>
        <FileDropdown design={design} />
        {saving && <FaSpinner className="animate-spin size-5" />}
      </div>
      <div className="flex gap-2">
        <DesignInput name={design?.title} id={design?._id} />
        {data && <UserButton image={data.image!} name={data.name!} />}
      </div>
    </div>
  );
};

export default Header;
