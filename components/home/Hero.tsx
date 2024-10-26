import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-8">
        <h1 className="text-3xl lg:text-6xl font-bold text-center">
          What will you
          <span className="from-[#02BED2] to-primary font-extrabold text-transparent bg-clip-text bg-gradient-to-r mx-2">
            design
          </span>
          today?
        </h1>
        <p className="text-muted-foreground font-semibold text-center">
          Canva makes it easy to create and share professional designs.
        </p>
        <Button className="text-white">Start designing</Button>
      </div>
    </div>
  );
};

export default Hero;
