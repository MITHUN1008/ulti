interface ToolSidebarHeaderProps {
  title: string;
  description?: string;
}

export const ToolHeader = ({ title, description }: ToolSidebarHeaderProps) => {
  return (
    <div className="border-b space-y-1 h-[50px]">
      <p className="text-sm font-medium">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
