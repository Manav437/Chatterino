function ShimmerUI() {
    return (
        <div className="flex h-screen w-screen flex-col bg-[#242424]">
            <div className="flex items-center justify-between border-b border-white bg-black p-2.5">
                <div className="flex items-center">
                    <div className="mr-1.25 h-16 w-16 animate-pulse rounded-full bg-gray-500"></div>
                    <div className="mt-2 h-5 w-[180px] animate-pulse rounded-full bg-gray-500"></div>
                </div>
                <div className="flex gap-2.5">
                    <div className="h-6 w-12 animate-pulse rounded bg-gray-500"></div>
                    <div className="h-6 w-12 animate-pulse rounded bg-gray-500"></div>
                    <div className="h-6 w-12 animate-pulse rounded bg-gray-500"></div>
                </div>
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-[0.15] border-r border-white">
                    <div className="mb-2.5 h-[95vh] w-full animate-pulse bg-black"></div>
                </div>
                <div className="flex-1 overflow-y-auto p-2.5">
                    <div className="mb-1.25 h-[200px] w-full animate-pulse border border-white"></div>
                    <div className="mb-1.25 h-[200px] w-full animate-pulse border border-white"></div>
                    <div className="mb-1.25 h-[200px] w-full animate-pulse border border-white"></div>
                    <div className="mb-1.25 h-[200px] w-full animate-pulse border border-white"></div>
                </div>
                <div className="flex-[0.25] border-l border-white p-2.5">
                    <div className="mx-auto my-5 h-10 w-[300px] animate-pulse rounded-[15px] bg-gray-500"></div>
                </div>
            </div>
        </div>
    )
}

export default ShimmerUI