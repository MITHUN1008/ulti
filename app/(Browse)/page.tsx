"use client";

import ReactConfetti from "@/components/dashboard/ReactConfetti";
import Templates from "@/components/design/sidebar/Templates";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import { runFireworks } from "@/lib/Confetti";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") || "false";

  useEffect(() => {
    if (success === "true") {
      runFireworks();
    }
  }, []);

  return (
    <div className="space-y-20 mb-4 mt-20">
      <ReactConfetti />
      <Hero />
      <Pricing />
      <div className="mx-10 lg:mx-20">
        <Templates />
      </div>
    </div>
  );
}
