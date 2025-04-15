"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { Button } from "@/components/ui/button";

import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import Moment from "react-moment";

const RecentDesigns = () => {
  const { isOnline } = useNetworkStatusStore();
  const { mutate, pending } = useApiMutation(api.design.deleteDesign);
  const designs = useQuery(api.design.designs);

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
          <p className="font-bold text-2xl text-center">Possibilities await!</p>
        </div>
      </div>
    );
  }

  const HandleDelete = async (id: string) => {
    await mutate({
      id,
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="space-y-4 pt-10">
      <h1 className="font-bold text-xl">Recent Designs</h1>
      {designs?.map((design) => (
        <div
          className="flex justify-between border border-gray-400 dark:border-zinc-700 rounded-md items-center p-3 mb-2"
          key={design._id}
        >
          <Link
            href={`/design/${design._id}`}
            className="flex gap-2 items-center"
          >
            {!design.thumbnailUrl ? (
              <div className="size-14 rounded-md bg-white" />
            ) : (
              <img
                src={design.thumbnailUrl}
                alt=""
                className="size-14 rounded-md"
              />
            )}
            <p>{design.title}</p>
          </Link>
          <Moment fromNow>{design._creationTime}</Moment>
          <Button
            variant={"destructive"}
            disabled={pending}
            onClick={() => HandleDelete(design._id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default RecentDesigns;
