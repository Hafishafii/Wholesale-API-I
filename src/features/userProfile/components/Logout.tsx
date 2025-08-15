import { AiOutlineLogout } from "react-icons/ai";

const Logout = ({logout}:any) => {
    return (
        <div onClick={logout} className="flex items-center gap-4 font-semibold text-xl p-4 rounded-lg shadow-[1px_3px_3px_rgb(0,0,0,0.1),inset_0_3px_3px_rgb(0,0,0,0.1)] hover:bg-blue-950 hover:text-white">
            <AiOutlineLogout />
            <p>Logout</p>
        </div>
    )
}

export default Logout