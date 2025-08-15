import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import FormInput from "./FormInput";
import { useImageCrop } from "../hooks/useCropImage";
import { inputs, profileSchema } from "../utils/schema";
import ImageUpload from "./ImageUpload";
import CropPopup from "./CropPopup";
import { Button } from "../../../../components/ui/button";
import { useProfile } from "../hooks/useProfile";
import { useEffect } from "react";
import EditProfileSkeleton from "./skeletons/EditProfileSkeleton";
import RetryWarning from "../../../../components/Warnings/RetryWarning";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

const EditProfileForm = () => {
  const { data, error, isLoading, refetch } = useProfile();

  const { updateProfile, isUpdating,setImage } = useUpdateProfile();

  const imgCrop = useImageCrop();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  const handleConfirmCrop = async () => {
    const cropped = await imgCrop.confirmCrop();
    if (cropped) {
      setImage(imgCrop.image);
    }
  };

  useEffect(() => {
    if (data) {
      setValue("bio", data.bio);
      setValue("company_name", data.company_name);
      setValue("first_name", data?.first_name);
      setValue("last_name", data?.last_name);
      setValue("phone_number", data?.phone_number);
      setValue("email", data?.email);
    }
  }, [data, setValue]);

  if (isLoading) {
    return <EditProfileSkeleton />;
  }

  if (error) {
    return (
      <RetryWarning
        title="Operation Failed!"
        description={error || "Failed to fetch user profile."}
        onRetry={refetch}
        isRetrying={isLoading}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(updateProfile)}
      className="space-y-4 w-full max-w-[1000px] md:min-w-[600px] lg:min-w-[800px] mx-auto p-[20px] md:p-[40px] shadow bg-white md:mx-[30px] md:rounded-xl grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[40px]"
    >
      <div className="flex flex-col  items-center gap-3 justify-between h-full">
        <ImageUpload
          croppedImage={imgCrop.croppedImage || data?.profile_pic || ""}
          onFileSelect={imgCrop.handleImageUpload}
        />

        <Button
          type="submit"
          className="hidden md:block bg-admin-bg text-white w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition mb-4"
        >
          Save
        </Button>
      </div>

      <div className="space-y-2">
        {inputs.map((item) => (
          <FormInput
            key={item}
            label={item === "company_name" ? "Company Name" : item}
            registration={register(item as keyof z.infer<typeof profileSchema>)}
            error={errors[item as keyof z.infer<typeof profileSchema>]}
          />
        ))}

        <div>
          <label>Bio</label>
          <textarea
            {...register("bio")}
            className="border p-2 w-full bg-[#f7f7f7] rounded-md no-scrollbar "
            rows={3}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm">{errors.bio.message}</p>
          )}
        </div>
      </div>

      {imgCrop.imageSrc && (
        <CropPopup
          open={imgCrop.showConfirmPopup}
          imageSrc={imgCrop.imageSrc}
          crop={imgCrop.crop}
          zoom={imgCrop.zoom}
          setCrop={imgCrop.setCrop}
          setZoom={imgCrop.setZoom}
          onCropComplete={imgCrop.onCropComplete}
          onCancel={() => imgCrop.setShowConfirmPopup(false)}
          onConfirm={handleConfirmCrop}
        />
      )}
      <Button
        type="submit"
        disabled={isUpdating}
        className="md:hidden bg-admin-bg text-white w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        {isUpdating ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default EditProfileForm;
