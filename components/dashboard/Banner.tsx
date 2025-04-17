import Image from "next/image";

const Banner = () => {
  return (
    <div className="dashboard-banner">
      <div className="text-center space-y-6">
        <h1 className="font-bold text-4xl lg:text-6xl flex items-center">
          <Image
            src="/favicon.ico"
            alt="favicon"
            height={100}
            width={100}
            className="size-16 animate-bounce mr-4"
          />
          Clone is Here
        </h1>
        <p className="text-muted-foreground text-sm lg:text-xl">
          Let your mind go wild.
        </p>
      </div>
    </div>
  );
};

export default Banner;
