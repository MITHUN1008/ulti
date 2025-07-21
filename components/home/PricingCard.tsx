"use client";

import { useRouter } from "../../src/hooks/useNavigation";
import { FaCrown } from "react-icons/fa";
import { useTransition } from "react";
import { toast } from "sonner";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
// createStripeCheckout removed for React migration
import { useCurrentUser } from "../../fetch/useCurrentUser";
import { useLoginStore } from "../../store/LoginStore";

const PricingCard = ({
  description,
  priceName,
  users,
}: {
  users: string;
  priceName: string;
  description: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const { setIsLogin } = useLoginStore();
  const isPro = user?.data?.isPro;

  const handleClick = async () => {
    if (!user?.data) {
      setIsLogin(true);
      return;
    }
    if (priceName === "Canva Free") {
      router.push("/dashboard");
      return;
    }
    if (isPro) return;
    startTransition(() => {
      const userId = user?.data?._id;
      if (!userId) return;

      // Stripe checkout removed for React migration
      toast.success("Payment feature coming soon!");
      router.push("/dashboard");
    });
  };
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
      <Button
        className="w-full text-white"
        onClick={handleClick}
        disabled={isPending || user.isLoading || isPro}
      >
        {priceName === "Canva Free" ? "Get Canva Free" : "Start free Pro trial"}
      </Button>
    </div>
  );
};

export default PricingCard;
