"use client";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/fetch/useCurrentUser";

import Banner from "@/components/dashboard/Banner";
import RecentDesigns from "@/components/dashboard/RecentDesigns";
import Sizes from "@/components/dashboard/Sizes";
import Offline from "@/components/global/Offline";

const DashboardPage = () => {
  const { data } = useCurrentUser();
  if (!data) redirect("/");
  return (
    <div className="flex flex-col space-y-6 p-10 mx-auto py-10">
      <Banner />
      <Offline />
      <Sizes />
      <RecentDesigns />
    </div>
  );
};

export default DashboardPage;
