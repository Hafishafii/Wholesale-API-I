import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AccountSetting = () => {
    const navigate = useNavigate()

    return (
        <div className="my-4">
            <h2 className="text-xl font-bold  mb-4">Account Setting</h2>

            <div className="border rounded-lg shadow-lg bg-white">
                {/* Item 1 */}
                <button onClick={() => navigate('/profile')} className="p-4 w-full flex justify-between items-center border-b hover:bg-gray-50 cursor-pointer transition">
                    <p className="font-medium text-gray-700">Profile</p>
                    <ChevronRight className="text-gray-400" />
                </button>

               
                <div onClick={()=>navigate("/address")} className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition">
                    <p className="font-medium text-gray-700">Your Address</p>
                    <ChevronRight className="text-gray-400" />
                </div>
            </div>

        </div>
    )
}

export default AccountSetting