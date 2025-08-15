import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import useFetchProfile from "../hooks/useFetchProfile";
import Loading from "./Loading";

const EditProfilePage = () => {
  const { handleSave, handleSubmit, register, errors, isLoading } =
    useFetchProfile();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full bg-gray-100">
          <div className="flex justify-center items-center max-w-[800px] mx-auto p-6 bg-gray-100">
            <div className="w-full">
              <form
                onSubmit={handleSubmit(handleSave)}
                className=" w-full bg-white rounded-lg p-4 border"
              >
                {/* First Name */}
                <div className="mb-6">
                  <label htmlFor="" className="font-semibold">
                    {" "}
                    First Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter First Name"
                    className="w-full border px-2 py-6 mt-1 rounded-md"
                    {...register("first_name", {
                      required: {
                        value: true,
                        message: "First Name is Required",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters",
                      },
                    })}
                  />
                  {errors.first_name?.message && (
                    <p className="text-red-600">{errors.first_name.message} </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="mb-6">
                  <label htmlFor="" className="font-semibold">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Store Last Name"
                    className="w-full border px-2 py-6 mt-1 rounded-md"
                    {...register("last_name", {
                      required: {
                        value: true,
                        message: "Last Name is Required",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters",
                      },
                    })}
                  />
                  {errors.last_name?.message && (
                    <p className="text-red-600">{errors.last_name.message} </p>
                  )}
                </div>

                {/* Company Name */}
                <div className="mb-6">
                  <label htmlFor="" className="font-semibold">
                    Company Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Company Name"
                    className="w-full border px-2 py-6 mt-1 rounded-md"
                    {...register("company_name", {
                      required: {
                        value: true,
                        message: "Company is Required",
                      },
                    })}
                  />
                  {errors.company_name?.message && (
                    <p className="text-red-600">
                      {errors.company_name.message}{" "}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label htmlFor="" className="font-semibold">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border px-2 py-6 mt-1 rounded-md"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Invalid Email Address",
                      },
                    })}
                  />
                  {errors.email?.message && (
                    <p className="text-red-600">{errors.email.message} </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="mb-6">
                  <label htmlFor="" className="font-semibold">
                    Phone Number
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter Phone Number"
                    className="w-full border px-2 py-6 mt-1 rounded-md"
                    {...register("phone_number", {
                      required: {
                        value: true,
                        message: "Phone Number is Required",
                      },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit number",
                      },
                    })}
                  />
                  {errors.phone_number?.message && (
                    <p className="text-red-600">
                      {errors.phone_number.message}{" "}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <label htmlFor="" className="font-semibold">
                    Bio
                  </label>
                  <textarea
                    placeholder="Enter Bio"
                    className="w-full min-h-[150px] max-h-[150px] h-[150px] overflow-auto border px-2 py-4 mt-1 rounded-md"
                    {...register("bio", {
                      required: {
                        value: true,
                        message: "Bio is Required",
                      },
                      maxLength: {
                        value: 300,
                        message: "Maximum 300 characters",
                      },
                    })}
                  />
                  {errors.bio?.message && (
                    <p className="text-red-600">{errors.bio.message} </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="bg-blue-950 text-white text-xl w-full py-6 px-4 rounded-xl"
                >
                  {isLoading ? "Submitting" : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfilePage;
