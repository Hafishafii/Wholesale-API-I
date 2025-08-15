import { Skeleton } from "../../../components/ui/skeleton"

const ProfileSkeleton = () => {
    return (
        <div className=" h-screen ">
            <div className="p-8 mt-10 flex flex-col justify-center items-center gap-4">
                <Skeleton className="h-[200px] w-[90%] rounded-xl" />
                <Skeleton className="h-[200px] w-[90%] rounded-xl" />
                <Skeleton className="h-[50px] w-[90%] rounded-xl" />
            </div>
        </div>
    )
}

export default ProfileSkeleton
