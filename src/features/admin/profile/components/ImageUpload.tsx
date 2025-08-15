import React, { useRef } from "react";
import { IoCameraOutline } from "react-icons/io5";

type Props = {
  croppedImage: string | null;
  onFileSelect: (file: File) => void;
  error?: string;
};

const ImageUpload = ({ croppedImage, onFileSelect, error }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="w-1/2 ">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        onClick={() => fileRef.current?.click()}
        className="w-full !aspect-square bg-gray-300 rounded-full overflow-hidden cursor-pointer flex items-center justify-center"
      >
        {croppedImage ? (
          <img
            src={croppedImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
         <IoCameraOutline className="opacity-30 text-6xl"/>
        )}
      </div>
      <label className="block mb-1 text-center mt-2">Profile Photo</label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ImageUpload;
