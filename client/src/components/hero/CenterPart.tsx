import { useState, type JSX } from "react"
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
const CenterPart = ({setCurrentIndex}: {setCurrentIndex: (index: number) => void}):JSX.Element => {
  const [selectedImage,setSelectedImage] = useState<string>("/hero-image-1.png");
  const mainImages: String[] = [
    "/hero-image-1.png",
    "/hero-image-2.png",
    "/hero-image-3.png"

  ];

  //click right :
  function handleClickRight(){
    const currentIndex = mainImages.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % mainImages.length;
    setSelectedImage(mainImages[nextIndex].toString());
    setCurrentIndex(nextIndex);
  }
  //click left :
  function handleClickLeft(){
    const currentIndex = mainImages.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + mainImages.length) % mainImages.length;
    setSelectedImage(mainImages[prevIndex].toString());
    setCurrentIndex(prevIndex);
  }
  return (
    <div
        className="w-[40%]  items-center relative flex flex-col h-full"
    >
      <img 
        alt="Image-for-Camera " 
        className="w-[75%] relative -top-16"
        src={selectedImage}
      />

      
     <div className="w-full flex gap-4 items-center justify-between">
       <button
          onClick={handleClickLeft}  
          title="LEFT"
          className="rounded-full cursor-pointer text-yellow-50 p-3 border-yellow-50 ">
          <GoChevronLeft size={27} />
       </button>
       <div className="flex gap-5  items-center justify-center">
          {mainImages.map((image: String, index: number) => (
            <img 
              onClick={() => {
                setSelectedImage(image.toString());
                setCurrentIndex(index);
              }}
              key={index}
              src={image.toString()}
              alt={`hero-image-${index + 1}`}
              className={`w-60 ${selectedImage === image.toString() ? "border-2" : "border"} border-orange-500 cursor-pointer object-cover p-3 h-30`}
            />
          ))}
        </div>
        <button 
          title="RIGHT"
          className="rounded-full cursor-pointer text-yellow-50 p-3 border-yellow-50 "
          onClick={handleClickRight}
        >
          <GoChevronRight size={27} />
        </button>
     </div>
      
    </div>

  )
}

export default CenterPart