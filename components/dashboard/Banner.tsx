const Banner = () => {
  return (
    <div className="text-white aspect-[7/1] min-h-[248px] flex justify-center items-center rounded-xl bg-gradient-to-r from-[#01DEE3] via-[#4B4CF3] to-[#7D2AE8]">
      <div className="text-center space-y-6">
        <h1 className="font-bold text-4xl lg:text-6xl flex items-center">
          <img
            src="/favicon.ico"
            alt="logo"
            className="size-16 animate-bounce mr-4"
          />
          Clone is Here!
        </h1>
        <p className="text-muted-foreground text-sm lg:text-xl">
          Let your mind go wild.
        </p>
      </div>
    </div>
  );
};

export default Banner;
