import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { FaCrown } from "react-icons/fa";

const PricingCard = ({
  description,
  priceName,
  users,
}: {
  users: string;
  priceName: string;
  description: string;
}) => {
  return (
    <div
      className={cn(
        "space-y-8 p-5 rounded-lg w-[300px] text-black",
        priceName === "Canva Free" ? "bg-gray-100" : "bg-primary/10"
      )}
    >
      <div className="flex justify-between items-center">
        <span className="bg-white rounded-full text-xs px-2 py-1">{users}</span>
        {priceName !== "Canva Free" && (
          <span className="p-1.5 bg-white rounded-full">
            <FaCrown className="size-4 text-orange-300" />
          </span>
        )}
      </div>

      <p className="text-xl font-bold text-primary">{priceName}</p>
      <p className="text-muted-foreground text-xs mb-4">{description}</p>
      <Button className="w-full text-white">
        {priceName === "Canva Free" ? "Get Canva Free" : "Start free Pro trial"}
      </Button>
    </div>
  );
};

export default PricingCard;
