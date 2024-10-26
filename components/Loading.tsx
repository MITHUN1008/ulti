import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image
        src={"/favicon.ico"}
        alt="logo"
        className="animate-bounce"
        height={30}
        width={30}
      />
    </div>
  );
};

export default Loading;
