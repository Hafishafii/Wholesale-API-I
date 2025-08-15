import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { MdOutlineHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
    const navigate = useNavigate()
    return (
        <div className="p-4 rounded-lg shadow-[1px_3px_3px_rgb(0,0,0,0.1),inset_0_3px_3px_rgb(0,0,0,0.1)]">
            <button onClick={() => { navigate("/profile/edit") }} className="flex gap-4 items-center font-semibold text-xl w-full hover:bg-blue-950 hover:text-white p-2 rounded-lg">
                <FaRegUser />
                <p>Profile Information</p>
            </button>
            <button onClick={() => { navigate("/profile/change-password") }} className="flex gap-4 items-center font-semibold text-xl w-full hover:bg-blue-950 hover:text-white p-2 rounded-lg">
                <MdOutlineLock />
                <p>Change Password</p>
            </button>
            <button onClick={() => { navigate("/help-desk") }} className="flex gap-4 items-center font-semibold text-xl hover:bg-blue-950 w-full hover:text-white p-2 rounded-lg">
                <MdOutlineHelpOutline />
                <p>Help & Support</p>
            </button>
        </div>
    )
}

export default ProfileDetails
