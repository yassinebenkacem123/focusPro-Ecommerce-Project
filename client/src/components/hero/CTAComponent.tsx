import LeftPart from "./LeftPart"
import CenterPart from "./CenterPart"
import RightPart from "./RightPart"
import { useState, type JSX } from "react";
const CTAComponent = ():JSX.Element => {
  const [currentIndex,setCurrentIndex] = useState<number>(0);
  function handleIndexChange(index:number){
    setCurrentIndex(index);
  }
  return (
    <div className='flex justify-between gap-3 py-8 px-4 bg-stone-900'>
        <LeftPart   />
        <CenterPart  setCurrentIndex={handleIndexChange} />
        <RightPart currentIndex={currentIndex} />
    </div>
  )
}

export default CTAComponent