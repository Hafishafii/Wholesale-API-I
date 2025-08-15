import { ChevronLeft } from "lucide-react"
import Logout from "./Logout"
import ProfileDetails from "./ProfileDetails"
import ProfileHeader from "./ProfileHeader"
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert';

const UserProfilePage = () => {
    const navigate = useNavigate()

    const logout = () => {
        swal({
            title: "Are you sure you want to logout?",
            text: "You will need to log in again to access your account.",
            icon: "warning",
            buttons: ["Cancel", "Logout"],
            dangerMode: true,
        }).then((willLogout) => {
            if (willLogout) {
                // ✅ Perform logout logic here
                swal("Logged out!", "You have been successfully logged out.", {
                    icon: "success",
                });

                localStorage.removeItem("accessToken");
                navigate("/login");
            } else {
                // ❌ Cancelled
                swal("Cancelled", "You're still logged in.", {
                    icon: "info",
                });
            }
        });
    }

    return (
        <div className="p-6">
            <div className="max-w-[800px] mx-auto flex flex-col gap-6">
                <button onClick={() => { navigate("/account") }} className="mb-4 flex gap-2 items-center">
                    <ChevronLeft />
                    <span className="font-semibold text-xl">Profile</span>
                </button>
                <ProfileHeader />
                <ProfileDetails />
                <Logout logout={logout} />
            </div>
        </div>
    )
}

export default UserProfilePage