import { useState } from "react";
import { Settings2 } from "lucide-react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { ProfileDetails, useAdminProfile } from "../../features/admin/profile";
import { Link } from "react-router-dom";
import profileBackground from "../../assets/images/profile-background.png";

const AdminProfilePage = () => {
  const { data } = useAdminProfile();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-[#A59DE0] font-sans">
        {/* Header */}
        <div
          style={{
            background: `url(${profileBackground})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="bg-[#A59DE0] pb-12 !aspect-[3/1] relative z-10"
        >
          {/* Mobile quote + image */}
          <div className="flex relative flex-col items-center text-center pt-6 px-4 md:hidden">
            <h1 className="text-xl font-semibold text-white mb-2">Profile</h1>
            <p className="text-white text-base font-medium leading-snug pb-3">
              "Seamless Control for <br />
              Smarter Wholesale <br />
              Management."
            </p>
          </div>

          {/* Desktop quote */}
          <div
            className="hidden md:flex items-center justify-between px-10 pt-10"
          >
            <div>
              <h1 className="text-3xl font-bold text-white pb-2">Profile</h1>
              <p className="text-white text-lg font-medium leading-snug">
                "Seamless Control for <br />
                Smarter Wholesale <br />
                Management."
              </p>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="relative bg-gradient-to-b from-[#151853] to-[#4564D6] py-16 px-4 sm:px-6 rounded-t-[30px]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 relative z-20">
            {/* Profile details */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <ProfileDetails data={data} />
            </div>

            {/* Action Buttons */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end relative mt-6 md:mt-0">
              <div className="flex gap-3 mb-4">
                <Link
                  to={"/admin/profile/edit"}
                  className="bg-white text-[#4564D6] px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors"
                >
                  Edit profile
                </Link>
                <button
                  className="text-white hover:text-gray-200 transition-colors"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings2 size={20} />
                </button>
              </div>

              {showSettings && (
                <div className="bg-white p-6 rounded-xl shadow-xl w-72 absolute top-16 md:top-14 right-0 z-30">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Settings
                  </h3>
                  <ul className="space-y-6 text-sm text-gray-700">
                    <li>
                      <Link
                        to={"/admin/profile/details"}
                        className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                      >
                        Account Details
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/admin/profile/change-password"}
                        className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                      >
                        Change Password
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-white text-sm mt-20 flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-6 h-6 rounded-full"
              />
              <span>Biolite Wholesales and Retails</span>
            </div>
            <div className="text-xs opacity-80">
              © {new Date().getFullYear()} All rights reserved
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfilePage;
