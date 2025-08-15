import { Skeleton } from "../../../components/ui/skeleton"

const Loading = () => {
    return (
        <div className=" h-screen ">
            <div className=" p-8 flex flex-col justify-center items-center gap-4">
                {
                    [...Array(10)].map((_, i) => (
                        <Skeleton key={i} className="h-[50px] w-[90%] rounded-xl" />
                    ))
                }

            </div>
        </div>
    )
}

export default Loading
