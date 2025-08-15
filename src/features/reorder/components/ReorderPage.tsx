import { useState } from "react"
import ReorderDetails from "./ReorderDetails"
import Loading from "../../purchase/components/Loading";

const ReorderPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    console.log(setIsLoading);

    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="p-6 bg-gray-100">
            <div className="max-w-[1000px] mx-auto">
                <h2 className="my-8 text-3xl font-bold">Reorder</h2>

                <div className="flex flex-col gap-4">
                    {/* map */}
                    <ReorderDetails />
                    <ReorderDetails />
                    <ReorderDetails />
                    <ReorderDetails />
                    <ReorderDetails />
                </div>
            </div>
        </div>
    )
}

export default ReorderPage