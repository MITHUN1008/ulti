import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const HovercardGlobal = ({
  trigger,
  content,
  side,
  use,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: "left" | "top" | "right" | "bottom";
  use?: "sidebar";
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{trigger}</HoverCardTrigger>
      <HoverCardContent
        side={side}
        className="dark:bg-darkHover h-fit w-[400px] z-[100] overflow-y-auto"
      >
        {content}
      </HoverCardContent>
    </HoverCard>
  );
};

export default HovercardGlobal;
