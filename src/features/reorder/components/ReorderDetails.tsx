import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"

const ReorderDetails = () => {
    const navigate = useNavigate()

    const clickBuyNow = () => {
        navigate("")
    }
    return (
        <div className="p-4 flex  gap-2 bg-gray-200 rounded-md">
            <img src="https://th.bing.com/th/id/R.19977682d88170b37032e7421e4b1656?rik=Dv7pQNMvYVH6CA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fshirt-png-hd-dress-shirt-png-image-dress-shirt-png-914.png&ehk=n8JoHBJIDOiOJwR9fAHFdGztHWIcTsZ3QjrTbwparoY%3d&risl=&pid=ImgRaw&r=0" alt="" className="w-34 h-34 m-auto object-cover shadow-lg p-2  rounded-lg" />
            <div className=" py-4 w-full flex flex-col justify-between">
                <p className="text-xl mb-4">VeBNoR Men Regular Fit Solid Spread Collar Casual Shirt  </p>
                <div className="flex flex-wrap justify-start gap-2 items-center sm:justify-center">
                    <p className="text-2xl ml-2 font-semibold mr-auto">₹ <span>600</span> </p>
                    <Button onClick={clickBuyNow} type="button" className="bg-blue-700 rounded-lg py-4 px-6 text-white text-xl ">Buy again </Button>
                </div>
            </div>
        </div>
    )
}

export default ReorderDetails