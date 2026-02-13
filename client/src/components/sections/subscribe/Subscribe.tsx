import RevealText from "../../../utils/RevealText";
import StartDeco from "../../decoretors/StartDeco"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Subscribe = () => {
  return (
    <div className="flex py-10 px-7 mb-10 justify-between bg-stone-200/40 gap-7 items-start">
        {/* left part. */}
        <RevealText as="h1" className="flex px-3 flex-col w-[60%] gap-10">
            <h1 className="text-8xl text-stone-800 font-medium  relative">
                Subscribe to 
                <StartDeco 
                    bgColor="bg-white/80"
                    startSize={70}   
                    padding="p-1" 
                    position="absolute right-50 top-5"
                    startColor="text-amber-300"
                />
                <br/>
                Our newsletters
            </h1>

            <RevealText as="p"  className="text-font">
                Subscribe to our newsletter and be the first to know about new product launches, 
                and inspiring stories from the world of the photography.
                
            </RevealText>
        
            <div className="flex gap-3 items-center">
                <div className="px-4 py-4 w-[60%] border border-gray-400/30 bg-white/80 rounded-full">
                    <input
                        required
                        placeholder="Enter your email."
                        className="outline-none border-none text-xl text-stone-800 w-full" 
                        type="text" />
                </div>
                <button className="bg-orange-500 px-6 py-4 rounded-full text-white text-2xl cursor-pointer flex gap-3 items-center">
                    Subscribe
                    <MdOutlineKeyboardArrowRight size={30}/>
                </button>
            </div>
        </RevealText>

        {/* right part. */}
        <div className="w-[40%] justify-end flex ">
            <img 
                className="h-133 w-full"
                src="/image-for-sub.png" alt="image for subscribe section" />
        </div>

    </div>
  )
}

export default Subscribe