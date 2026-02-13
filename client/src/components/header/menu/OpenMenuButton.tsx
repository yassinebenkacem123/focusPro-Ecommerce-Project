import { MdMenuOpen } from "react-icons/md";
import type { JSX } from "react";
type MenuButtonProps = {
    setOpenMenu:React.Dispatch<React.SetStateAction<boolean>>;
}
const OpenMenuButton = ({
    setOpenMenu
}: MenuButtonProps): JSX.Element => {
  return (
    <button
        onClick={()=>{setOpenMenu(true)}}
        className="px-3 py-2 rounded-full cursor-pointer hover:bg-stone-100/70 border border-stone-800"
    >
        <div className="flex items-center justify-center gap-3">
            <MdMenuOpen size={25}/>
            <h1 className="text-xl text-stone-800">
                Menu
            </h1>
        </div>
    </button>
  )
}

export default  OpenMenuButton