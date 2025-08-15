import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "../utils/schema";
import { Button } from "../../../../components/ui/button";
import AvatarComponent from "../../../../components/common/AvatarComponent";
import { useAdmin } from "../../../../hooks/useAdmin";
import { defaultProfile } from "../../../../utils/helpers/constants";
import { passwordFields } from "../utils/data";
import type z from "zod";
import { useChangePassword } from "../hooks/useChangePassword";

const ChangePasswordForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const {} = useAdmin();

  const { changePassword, loading } = useChangePassword();

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    try {
      await changePassword(data);
      reset();
    } catch {}
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full sm:w-fit mx-auto p-[20px] md:p-[40px] sm:shadow bg-white md:mx-[30px] sm:rounded-xl flex flex-col md:flex-row gap-[20px] md:gap-[40px]"
    >
      <AvatarComponent
        fallback="Profile Picture"
        alt="Your profile picture"
        src={defaultProfile}
        className="w-[150px] sm:w-[200px] object-cover h-[150px] sm:h-[200px] mx-auto"
      />

      <section className="space-y-2 sm:w-[300px]">
        {passwordFields.map(({ label, name }) => (
          <FormInput
            type="password"
            key={name}
            label={label}
            registration={register(
              name as keyof z.infer<typeof passwordSchema>
            )}
            name={name}
            error={errors[name as keyof z.infer<typeof passwordSchema>]}
          />
        ))}

        <Button
          type="submit"
          className="bg-admin-bg hover:bg-black text-white w-full mt-2"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </section>
    </form>
  );
};

export default ChangePasswordForm;
