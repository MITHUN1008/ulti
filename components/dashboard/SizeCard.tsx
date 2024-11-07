"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { useRouter } from "next/navigation";
import { IconType } from "react-icons/lib";

const SizeCard = ({
  backgroundColor,
  color,
  Icon,
  height,
  width,
  name,
}: {
  color: string;
  Icon: IconType;
  backgroundColor: string;
  height: number;
  width: number;
  name: string;
}) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.design.createDesign);
  const size = `${width}x${height} px`;

  const handleClick = async () => {
    await mutate({
      title: "untitled design",
      json: { version: "6.4.3", objects: [], background: "white" },
      height: height,
      width: width,
      isPro: false,
      isTemplate: false,
      category: "",
    })
      .then((id) => {
        // console.log(id);
        router.push(`/design/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      className="cursor-pointer group items-center flex flex-col space-y-1 w-20 disabled:opacity-50"
      onClick={handleClick}
      disabled={pending}
    >
      <div
        className="p-2 rounded-full w-fit transition-all duration-300"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <Icon
          className="size-6 group-hover:animate-bounce"
          style={{
            color: color,
          }}
        />
      </div>
      <p className="text-xs text-clip text-center">{name}</p>
      <p className="text hidden group-hover:flex">{size}</p>
    </button>
  );
};

export default SizeCard;
