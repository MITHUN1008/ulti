
import { ToolHeader } from "@/components/global/tool-header";
import { Button } from "@/components/ui/button";
import { useCanvas } from "@/store/useCanvas";
import Offline from "@/components/global/Offline";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useTransition, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import * as fabric from "fabric";
import { ImSpinner6 } from "react-icons/im";
import NoItems from "@/components/global/NoItems";

const Uploads = () => {
  const { canvas } = useCanvas();
  const { isOnline } = useNetworkStatusStore();
  const [deletePending, startTransition] = useTransition();
  const [userImages, setUserImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const loadImages = () => {
      setLoading(true);
      const images = localStorage.getItem('userImages');
      setUserImages(images ? JSON.parse(images) : []);
      setLoading(false);
    };
    
    loadImages();
  }, []);

  if (!isOnline) {
    return <Offline />;
  }

  const handleUpload = async (images: string[]) => {
    if (!images || images.length === 0) {
      toast.error("No images uploaded");
      return;
    }
    
    setPending(true);
    try {
      const updatedImages = [...userImages, ...images];
      localStorage.setItem('userImages', JSON.stringify(updatedImages));
      setUserImages(updatedImages);
      toast.success("Upload Completed");
    } catch (error) {
      toast.error("Upload Failed");
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const handleDelete = async (image: string) => {
    startTransition(() => {
      const updatedImages = userImages.filter((img) => img !== image);
      localStorage.setItem('userImages', JSON.stringify(updatedImages));
      setUserImages(updatedImages);
      toast("Image Deleted");
    });
  };

  const addToCanvas = (image: string) => {
    fabric.FabricImage.fromURL(image, { crossOrigin: "anonymous" })
      .then((img) => {
        const clipPath = new fabric.Rect({
          width: img.width!,
          height: img.height!,
          rx: 0,
          ry: 0,
          originX: "center",
          originY: "center",
        });

        img.set({
          clipPath,
          originX: "center",
          originY: "center",
        });
        canvas?.add(img);
        canvas?.setActiveObject(img);
        canvas?.renderAll();
      })
      .catch((e) => {
        console.error("Error loading image", e);
      });
  };

  // Mock file input for demo purposes
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map(file => URL.createObjectURL(file));
      handleUpload(imageUrls);
    }
  };

  return (
    <ScrollArea className="h-[70vh]">
      <div className="flex flex-col w-full">
        <ToolHeader title="Upload Images" description="Upload Images" />
        <div className="mt-2">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            disabled={pending}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <ToolHeader
          title="Images"
          description="Choose an image to add to your canvas"
        />
        {userImages.length === 0 && (
          <NoItems text="No Images to Show" />
        )}
        {loading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <ImSpinner6 className="size-10 animate-spin" />
          </div>
        ) : (
          <div className="image-grid">
            {userImages.map((image, index) => (
              <div key={index} className="relative cursor-pointer hover:p-1">
                <img
                  src={image}
                  alt="image"
                  onClick={() => addToCanvas(image)}
                  className="h-fit border dark:border-gray-500 rounded-md"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(image)}
                  className="absolute top-2 right-2 size-8"
                  disabled={pending || deletePending}
                >
                  <MdDelete className="size-8" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Uploads;
