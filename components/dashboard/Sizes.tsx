"use client";

import SizeCard from "@/components/dashboard/SizeCard";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";

import { GrYoutube } from "react-icons/gr";
const Sizes = () => {
  const { isOnline } = useNetworkStatusStore();

  if (!isOnline) {
    return null;
  }
  return (
    <div className="mx-10 flex gap-2 h-[40px]">
      <SizeCard
        name="Youtube Thumbnail"
        Icon={GrYoutube}
        color="#b91c1c"
        backgroundColor="#fee2e2"
        height={720}
        width={1280}
      />
      <SizeCard
        name="Youtube Banner"
        Icon={GrYoutube}
        color="#b91c1c"
        backgroundColor="#fee2e2"
        height={2560}
        width={1440}
      />
    </div>
  );
};

export default Sizes;
