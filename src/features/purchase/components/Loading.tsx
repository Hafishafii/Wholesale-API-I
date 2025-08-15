import { Skeleton } from "../../../components/ui/skeleton"

function Loading() {
  const array = new Array(6).fill(null)
  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-col gap-4">
          {
            array.map((_, i) => (
              <div key={i} className="p-4 flex gap-2 bg-gray-200 rounded-md">
                <Skeleton className=" w-36 h-24 rounded-lg" />
                <div className="flex flex-col gap-2 p-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>

  )
}


export default Loading