import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import HomeHeader from "@/components/navigation/HomeHeader";

export default function Home() {
  return (
    <div className="space-y-20 mb-4">
      <HomeHeader />
      <Hero />
      <Pricing />
    </div>
  );
}
