import { FaStar } from "react-icons/fa6"
import type { JSX } from "react";
import RevealText from "../../utils/RevealText";
const RightPart = ({currentIndex}:{currentIndex: number}): JSX.Element => {
    const videos:string[] =[
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4"
  ]
  return (
    <div className='w-[30%] flex flex-col  gap-5 justify-center px-5'>
      {/* top one */}
      <div className="flex flex-col gap-5">
        <div className='flex justify-around px-7 items-center'>
          {Array.from({ length: 6 }).map((_, index) => (
            <FaStar key={index} size={22} className="text-yellow-300" />
          ))}
        </div>
        <RevealText as="p" className="tex-xl text-yellow-50 ">
          I couldn't be happier with my purchase! The camera's image quality is outstanding,
          capturing every detail with vibrant colors.
        </RevealText>
      </div>

      {/* bottom one */}
      <div className="w-full border-orange-500/60 rounded-lg border p-1 h-full">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src={videos[currentIndex]}
            />
      </div>
    </div>
  )
}

export default RightPart