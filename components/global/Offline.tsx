"use client";

import { useNetworkStatusStore } from "@/store/NetworkStatusStore";

import Image from "next/image";

const Offline = () => {
  const { isOnline } = useNetworkStatusStore();

  return (
    <div className="flex flex-col space-y-3">
      <Image
        src={"/offline.png"}
        alt="offline image"
        height={100}
        width={100}
      />
    </div>
  );
};

export default Offline;
