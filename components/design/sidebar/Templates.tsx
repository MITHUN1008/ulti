"use client";

import { api } from "@/convex/_generated/api";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { useCanvas } from "@/store/useCanvas";

// import Moment from "react-moment";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useQuery } from "convex/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { ImSpinner6 } from "react-icons/im";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { useLoginStore } from "@/store/LoginStore";

const Templates = () => {
  const { canvas } = useCanvas();
  const { isOnline } = useNetworkStatusStore();
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useCurrentUser();
  const { setIsLogin } = useLoginStore();

  const designs = useQuery(api.design.publishedDesigns);
  const { mutate, pending } = useApiMutation(api.design.createDesign);

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

  const handleSelect = async (design: designProps) => {
    if (pathname === "/") {
      if (!data) {
        setIsLogin(true);
      } else {
        await mutate({
          title: "untitled design",
          json: design.json,
          height: design.height,
          width: design.width,
          isPro: false,
          category: "",
          published: false,
        })
          .then((id) => {
            // console.log(id);
            router.push(`/design/${id}`);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      if (!canvas) return;
      canvas
        .loadFromJSON(design.json)
        .then((canvas) => canvas.requestRenderAll())
        .catch((error) => {
          console.error("Error loading JSON:", error);
          // Handle the error as needed, e.g., show an error message to the user
        });
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl mb-2">
        Templates for absolutely anything
      </h1>
      <p className="text-lg mb-4 text-gray-500 dark:text-zinc-400">
        Customize an office template, or design something more personal, like an
        invitation.
      </p>
      {designs === undefined ? (
        <div className="flex justify-center items-center h-[40vh]">
          <ImSpinner6 className="size-10 animate-spin" />
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "24px" }}
        >
          <Masonry>
            {designs?.map((design) => (
              <button
                className="rounded-md cursor-pointer h-fit disabled:opacity-50 disabled:cursor-not-allowed"
                key={design._id}
                onClick={() => handleSelect(design)}
                disabled={pending}
                type="button"
              >
                <div className="gap-4 items-center space-y-2">
                  {!design.thumbnailUrl ? (
                    <div className="h-60 w-md rounded-md bg-white border border-gray-400 dark:border-zinc-700" />
                  ) : (
                    <img
                      src={design.thumbnailUrl}
                      alt=""
                      className="rounded-md"
                    />
                  )}
                </div>
              </button>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
};

export default Templates;
