import type { JSX } from "react"
import type { CameraInfo } from "../../../lib/type"
import { GiStarShuriken } from "react-icons/gi"
import { MdKeyboardArrowUp } from "react-icons/md"
import { HiShoppingCart } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";

interface CamerDetailsCardProps {
    camera: CameraInfo,
    setOpenCameraIndex?: React.Dispatch<React.SetStateAction<number | null>>,
}
const CamerDetailsCard = ({ camera, setOpenCameraIndex }: CamerDetailsCardProps): JSX.Element => {
    return (
        <div className="flex bg-stone-900  backdrop-blur-sm py-5 px-5 gap-8 flex-col  border border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div className="rounded-full shadow-sm relative bg-stone-100 text-stone-800 p-4 backdrop-blur-md">
                    <GiStarShuriken size={28} />
                </div>
                <h1 className="text-stone-100 text-4xl font-bold tracking-tight drop-shadow-sm">
                    {camera.name}
                </h1>
                <button
                    onClick={() => setOpenCameraIndex?.(null)}
                    title="view camera details"
                    className="p-6 text-amber-50 bg-amber-300 rounded-full cursor-pointer shadow-lg ease-out">
                    <MdKeyboardArrowUp size={30} />
                </button>
            </div>



            <div className="flex items-center justify-between gap-10">
                <div className="flex flex-col gap-4 items-center">
                    <div className="border border-stone-800/10 bg-yellow-300 backdrop-blur-sm p-6 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                        <HiShoppingCart size={32} className="text-stone-800" />

                    </div>
                    <h3 className="text-stone-100 mt-5 text-4xl font-bold tracking-tighter">
                        ${camera.price}
                    </h3>
                </div>

                <div className="relative group">
                    <div className="absolute inset-0 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-500" />
                    <img
                        className="w-[15rem] relative z-10 drop-shadow-2xl duration-500 ease-out"
                        src={camera.imageUrl} alt={camera.name} />
                </div>

                <div className="flex flex-col gap-6 items-end">
                    <div className="flex gap-1 items-center bg-gray-100 px-4 py-2 rounded-full border border-stone-800/5">

                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <FaStar key={index} size={22} className="text-amber-300" />
                        ))
                        }
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold tracking-widest text-stone-100/80 uppercase">Total Rating</span>
                        <span className="text-3xl font-bold text-stone-100">{camera.totalRatings}</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CamerDetailsCard