import { HiShoppingCart } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
const CustomBadge = ({count}:{count: number }) => {
  const navigate = useNavigate()
  return (
        <button 
          title="cart"
          className="border relative cursor-pointer hover:bg-stone-100/70 border-stone-800 rounded-full p-3"
          onClick={() => navigate("/cart")}>
                <HiShoppingCart size={25} />
            <div className="relative">
                <span className="absolute left-4 -top-10 bg-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {count}
                </span>
            </div>
        </button>
      
  )
}

export default CustomBadge