import { IoMdArrowDropleft } from 'react-icons/io'
import { IoPauseOutline } from 'react-icons/io5'

type SlideButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const SlideButton = ({ isOpen, onToggle }: SlideButtonProps) => {
  return (
     <button 
        type='button'
        onClick={onToggle}
        title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        className='flex text-2xl cursor-pointer relative items-center text-gray-500 dark:text-gray-400 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'>
          <IoMdArrowDropleft className={`left-3 relative transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
          <IoPauseOutline />
    </button>
  )
}

export default SlideButton