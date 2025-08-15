import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import Cropper from "react-easy-crop";

type Props = {
  open: boolean;
  imageSrc: string;
  crop: { x: number; y: number };
  zoom: number;
  setCrop: (val: { x: number; y: number }) => void;
  setZoom: (val: number) => void;
  onCropComplete: (croppedArea: any, croppedPixels: any) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

const CropPopup = ({
  open,
  imageSrc,
  crop,
  zoom,
  setCrop,
  setZoom,
  onCropComplete,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-64 bg-muted rounded overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="bg-admin-bg text-white hover:bg-black" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CropPopup;
