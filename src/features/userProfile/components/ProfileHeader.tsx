import { CircleUser } from "lucide-react"
import useFetchProfile from "../../editProfile/hooks/useFetchProfile"

const ProfileHeader = () => {
    const { user } = useFetchProfile()

    return (
        <div className="shadow-[1px_3px_3px_rgb(0,0,0,0.1),inset_0_1px_3px_rgb(0,0,0,0.1)] p-4 rounded-lg">
            <div className="flex gap-4 border-b px-2 py-4 items-center ">
                <div className="overflow-hidden w-15 h-15 rounded-full flex justify-center items-center bg-blue-950">
                    <span className="text-white"> <CircleUser width={30} /></span>
                </div>
                <p className="text-2xl font-semibold">{user && `${user.first_name} ${user.last_name}`}</p>
            </div>
        </div>

    )
}

export default ProfileHeader