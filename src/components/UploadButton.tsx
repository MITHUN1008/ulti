import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef } from "react";

interface UploadButtonProps {
  endpoint: string;
  onClientUploadComplete: (res: Array<{ ufsUrl: string }>) => void;
  onUploadError: (error: Error) => void;
  appearance?: {
    button?: string;
    container?: string;
    allowedContent?: string;
  };
  disabled?: boolean;
}

const UploadButton = ({
  onClientUploadComplete,
  onUploadError,
  appearance,
  disabled
}: UploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Simulate upload by creating object URLs
    try {
      const results = Array.from(files).map(file => ({
        ufsUrl: URL.createObjectURL(file)
      }));
      
      onClientUploadComplete(results);
    } catch (error) {
      onUploadError(error as Error);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={appearance?.container}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        onClick={handleClick}
        disabled={disabled}
        className={appearance?.button}
      >
        Upload Images
      </Button>
      <div className={appearance?.allowedContent}>
        Choose images to upload
      </div>
    </div>
  );
};

export { UploadButton };