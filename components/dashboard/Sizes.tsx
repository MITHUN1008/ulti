"use client";

import SizeCard from "@/components/dashboard/SizeCard";
import { useNetworkStatusStore } from "../../store/NetworkStatusStore";
import { designTypes } from "@/type/types";
import { localAPI } from "@/lib/localStorageAPI";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/src/hooks/useNavigation";
import * as fabric from "fabric";
import { useState } from "react";

const Sizes = () => {
  const { isOnline } = useNetworkStatusStore();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  if (!isOnline) {
    return null;
  }
  return (
    <div className="sizes-grid">
      {designTypes.map((design, i) => {
        const handleClick = async () => {
          setPending(true);
          try {
            const id = localAPI.createDesign({
              title: "untitled design",
              json: {
                version: fabric.version,
                objects: [],
                background: "#f0f0f0",
              },
              height: design.height,
              width: design.width,
              isPro: false,
              category: "",
              published: false,
            });
            router.push(`/design/${id}`);
          } catch (error) {
            console.log(error);
          } finally {
            setPending(false);
          }
        };

        return (
          <Button
            key={i}
            className="size-btn size-32 group"
            onClick={handleClick}
            disabled={pending}
            variant={"ghost"}
          >
            <SizeCard
              name={design.label}
              Icon={design.icon}
              color={design.bgColor}
              backgroundColor="#fee2e2"
              height={design.height}
              width={design.width}
            />
          </Button>
        );
      })}
    </div>
  );
};

export default Sizes;
