import { Slider } from "@/components/ui/slider";
import { ToolHeader } from "@/components/global/tool-header";

interface OpacityPickerProps {
  value: number;
  onChange: (property: keyof fabric.Object, value: number) => void;
  property: keyof fabric.Object;
  title: string;
  desc: string;
}

const Opacity = ({
  value,
  onChange,
  property,
  title,
  desc,
}: OpacityPickerProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <ToolHeader title={title} description={desc} />

      <Slider
        defaultValue={[value]}
        onValueChange={(values) => onChange(property, values[0])}
        max={1}
        min={0}
        step={0.01}
      />
    </div>
  );
};

export default Opacity;
