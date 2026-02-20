import { IoMdArrowDropleft } from 'react-icons/io'
import { IoPauseOutline } from 'react-icons/io5'

const SlideButton = () => {
  return (
     <button 
        title='Slide Menu'
        className='flex text-2xl cursor-pointer relative items-center text-gray-600'>
          <IoMdArrowDropleft  className='left-3 relative'/>
          <IoPauseOutline />
    </button>
  )
}

export default SlideButton