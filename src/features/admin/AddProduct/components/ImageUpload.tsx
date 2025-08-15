import { useState, useCallback, useRef } from 'react';
import type { FC } from 'react';

interface ImageUploadFormProps {
  onImagesChange: (files: File[]) => void;
}

export const ImageUploadForm: FC<ImageUploadFormProps> = ({ onImagesChange }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        const updatedFiles = [...images, ...newFiles];
        setImages(updatedFiles);
        onImagesChange(updatedFiles);

        const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...newPreviews]);
      }
    },
    [images, onImagesChange]
  );

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setImages(updatedFiles);
    setPreviewImages(updatedPreviews);
    onImagesChange(updatedFiles);
  };

  return (
    <div className="mb-6 p-6 bg-gray-100 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />

      <div className="flex flex-wrap gap-4">
        {/* + Button */}
        <button
          type="button"
          onClick={handlePlusClick}
          className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-gray-600 transition"
          aria-label="Add images"
        >
          <span className="text-4xl text-gray-400 select-none">+</span>
        </button>

        {/* Preview images */}
        {previewImages.map((src, index) => (
          <div key={index} className="relative w-32 h-32">
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded border border-gray-300"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
