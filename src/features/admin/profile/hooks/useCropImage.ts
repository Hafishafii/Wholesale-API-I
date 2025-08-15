import { useCallback, useState } from "react";
import { getCroppedImg } from "../../../../utils/cropImage";

export const useImageCrop = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [image,setImage] = useState<File>()

    const onCropComplete = useCallback((_: any, area: any) => {
        setCroppedAreaPixels(area);
    }, []);

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(file)
            setImageSrc(reader.result as string);
            setShowConfirmPopup(true);
        };
    };

    const confirmCrop = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
        setCroppedImage(cropped);
        setShowConfirmPopup(false);
        return cropped;
    };

    return {
        imageSrc,
        croppedImage,
        crop,
        zoom,
        setCrop,
        setZoom,
        onCropComplete,
        handleImageUpload,
        confirmCrop,
        showConfirmPopup,
        setShowConfirmPopup,
        image
    };
};
