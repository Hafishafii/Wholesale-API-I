import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Personatizations = () => {
    const navigate = useNavigate()
    return (
        <div className="my-4">
            <h2 className="text-xl font-bold mb-4">Personatizations</h2>
            <div className="shadow-md rounded-lg border bg-white ">
                <div onClick={() => navigate("/wishlist")} className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition">
                    <p className="font-semibold">Wish list</p>
                    <ChevronRight className="text-gray-400" />
                </div>

            </div>

        </div>
    )
}

export default Personatizations