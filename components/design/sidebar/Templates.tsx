"use client";

import { api } from "@/convex/_generated/api";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCanvas } from "@/store/useCanvas";

import { useQuery } from "convex/react";
import Image from "next/image";
import Moment from "react-moment";
const Templates = () => {
  const { isOnline } = useNetworkStatusStore();
  const designs = useQuery(api.design.publishedDesigns);
  const { canvas } = useCanvas();

  if (!isOnline) {
    return null;
  }

  if (designs?.length === 0) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <div>
          <Image
            src={"/noprojects.png"}
            alt="offline-png"
            height={500}
            width={500}
          />
          <p className="font-bold text-2xl text-center">
            No Published Projects
          </p>
        </div>
      </div>
    );
  }

  const handleSelect = async (json: string) => {
    if (!canvas) return;
    canvas
      .loadFromJSON(json)
      .then((canvas) => canvas.requestRenderAll())
      .catch((error) => {
        console.error("Error loading JSON:", error);
        // Handle the error as needed, e.g., show an error message to the user
      });
  };

  return (
    <ScrollArea className="h-[70vh]">
      <h1 className="font-bold text-xl">Published Designs</h1>
      <div className="grid grid-cols-2 gap-4">
        {designs?.map((design) => (
          <div
            className="border border-gray-400 dark:border-zinc-700 rounded-md items-center p-2 space-y-2 cursor-pointer"
            key={design._id}
            onClick={() => handleSelect(design.json)}
          >
            <div className="gap-4 items-center space-y-2">
              {!design.thumbnailUrl ? (
                <div className="h-20 w-full rounded-md bg-white border border-gray-400 dark:border-zinc-700" />
              ) : (
                <img src={design.thumbnailUrl} alt="" className="rounded-md" />
              )}
              <p className="text-lightBlue font-semibold line-clamp-1">
                {design.title}
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Published:{"  "}
              <Moment fromNow className="capitalize">
                {design._creationTime}
              </Moment>
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Templates;
