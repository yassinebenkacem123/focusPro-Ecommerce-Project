import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import LineWithDot from "../../decoretors/LineWithDot";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { JSX } from "react";
import RevealText from "../../../utils/RevealText";

const ShownCreativity = ():JSX.Element => {
  return (
    <section className="min-h-screen gap-30 py-15 flex flex-col">
        <RevealText as="h1" className="title-font text-center leading-30">
            Crafted for creatives your lens to the world
        </RevealText>
        <div className="w-full h-0.5 bg-stone-300/60"/>
        <div className="flex gap-10">
           
            <div className="w-[50%] relative bg-amber-300">
                <img 
                    className="absolute h-200  z-10 w-full bottom-0"
                    src="/special-image.png" 
                    alt="special image"  
                />
                <div className="text-[9rem] relative   overflow-hidden text-stone-700 opacity-20 bg-amber-300 w-md rotate-10 font-semibold top-50 left-59">
                   <h1 className="relative ">
                        FOCUS
                    </h1> 
                </div>
            </div>



            <div className="w-[50%] flex flex-col gap-4">
                <div className="flex items-center gap-4">
                   <div className="flex flex-col items-start gap-8">
                        <h1 className="text-3xl font-bold text-stone-800">
                            Precision & Clarity
                        </h1>
                        <p className="">
                            Our cameras boast high-regulation sensors and advanced optics,
                            ensuring every shot is sharp, vibrant, and true to life.
                        </p>
                        <button className="bg-orange-500 gap-4 flex items-center justify-center text-xl text-white rounded-full px-4 cursor-pointer py-3">
                            Learn More
                            <MdOutlineKeyboardArrowRight size={30}/> 
                        </button>
                   </div>
                   <div>
                        <img
                            src="/image-special-icon.png"
                            alt="special icon"
                            className="w-200"
                        />
                   </div>
                </div>
                <div className="flex flex-col gap-2">
                    <LineWithDot />
                        <div className="flex py-2 items-center justify-between px-7">
                            <h2 className="text-3xl font-bold text-stone-800">
                                Dynamic Range
                            </h2>
                            <button
                                title="Open"
                                className="bg-stone-800 text-yellow-50 rounded-full p-5">
                                <MdKeyboardArrowDown size={25} />
                            </button>
                        </div>
                    <LineWithDot />
                        <div className="flex py-2 items-center justify-between px-7">
                            <h2 className="text-3xl font-bold text-stone-800">
                                Speed & Performance
                            </h2>
                            <button 
                                title="Open"
                                className="bg-stone-800 text-yellow-50 rounded-full p-5">
                                <MdKeyboardArrowDown size={25} />
                            </button>
                        </div>
                   
                    <LineWithDot />

                </div>
            </div>
        </div>
    </section>
  )
}

export default ShownCreativity