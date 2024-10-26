"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { useLoginStore } from "@/store/LoginStore";

import Image from "next/image";
import UserButton from "../global/UserButton";

const HomeHeader = () => {
  const { setIsLogin } = useLoginStore();
  const { data } = useCurrentUser();
  console.log(data);
  return (
    <div className="flex justify-between p-3 shadow-lg dark:border-b">
      <Image src={"/logo.png"} alt="logo" height={100} width={100} />
      <div className="flex gap-2">
        {data ? (
          <UserButton image={data.image!} name={data.name!} />
        ) : (
          <>
            <Button variant={"outline"} onClick={() => setIsLogin(true)}>
              Login
            </Button>
            <Button className="text-white" onClick={() => setIsLogin(true)}>
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
