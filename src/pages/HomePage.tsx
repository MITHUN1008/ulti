import Templates from "@/components/design/sidebar/Templates";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import HomeHeader from "@/components/navigation/HomeHeader";

export default function HomePage() {
  return (
    <div>
      <HomeHeader />
      <div className="space-y-20 mb-4 mt-20">
        <Hero />
        <Pricing />
        <div className="mx-10 lg:mx-20">
          <Templates />
        </div>
      </div>
    </div>
  );
}