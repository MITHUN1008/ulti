import { IconType } from "react-icons/lib";

const ElementCard = ({
  onClick,
  Icon,
  Text,
}: {
  onClick: () => void;
  Icon: IconType;
  Text: string;
}) => {
  return (
    <div
      className="flex flex-col space-y-2 items-center w-[80px] dark:hover:bg-dark/40 hover:bg-muted p-2 rounded-md cursor-pointer"
      onClick={onClick}
    >
      <Icon className="size-10" />
      <p className="text-sm">{Text}</p>
    </div>
  );
};

export default ElementCard;
