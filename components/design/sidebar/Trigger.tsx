import { IconType } from "react-icons/lib";

const Trigger = ({ Icon, text }: { Icon: IconType; text: string }) => {
  return (
    <div className="flex flex-col space-y-1 mt-4 items-center hover:text-primary">
      <span className="border p-2 rounded-lg size-fit hover:bg-dark/10 dark:hover:bg-darkHover cursor-pointer">
        <Icon className="size-6" />
      </span>
      <p className="text-xs cursor-pointer">{text}</p>
    </div>
  );
};

export default Trigger;
