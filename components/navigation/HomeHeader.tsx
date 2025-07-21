
"use client";

import { Button } from "../ui/button";
import { useLoginStore } from "../../store/LoginStore";
import UserButton from "../global/UserButton";
import { useAuth } from "../provider/AuthProvider";

import Image from "../../src/components/ReactImage";
import Link from "../../src/components/ReactLink";
import { ImSpinner6 } from "react-icons/im";

const HomeHeader = () => {
  const { setIsLogin } = useLoginStore();
  const { user, isLoading } = useAuth();

  return (
    <div className="header">
      <Link href={"/"}>
        <Image
          src={"/logo.png"}
          alt="logo"
          height={100}
          width={100}
          className="size-auto"
        />
      </Link>
      <div className="flex gap-2">
        {isLoading ? (
          <ImSpinner6 className="size-7 animate-spin" />
        ) : user ? (
          <UserButton />
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
