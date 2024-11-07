import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import Pricing from "@/components/home/Pricing";
import { usePricingStore } from "@/store/PricingStore";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

const PlansModal = () => {
  const { signIn } = useAuthActions();
  const { isPricing, setIsPricing } = usePricingStore();
  const { isOnline } = useNetworkStatusStore();
  const [loading, setLoading] = useState(false);

  if (isPricing) {
    return (
      <Dialog onOpenChange={setIsPricing} open={isPricing}>
        <DialogContent className="sm:max-w-5xl overflow-y-auto">
          <Pricing />
        </DialogContent>
      </Dialog>
    );
  }
};

export default PlansModal;
