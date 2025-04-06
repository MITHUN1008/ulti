"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { useLoginStore } from "@/store/LoginStore";
import UserButton from "@/components/global/UserButton";

import Image from "next/image";
import Link from "next/link";

const HomeHeader = () => {
  const { setIsLogin } = useLoginStore();
  const { data } = useCurrentUser();
  // console.log(data);
  return (
    <div className="flex justify-between p-3 shadow-lg sticky top-0 z-30 dark:bg-dark bg-white">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo" height={100} width={100} />
      </Link>
      <div className="flex gap-2">
        {data ? (
          <UserButton image={data.image!} name={data.name!} />
        ) : (
          <>
            <Button
              variant={"outline"}
              onClick={() => setIsLogin(true)}
              className="hover:dark:bg-dark dark:bg-dark/10"
            >
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
