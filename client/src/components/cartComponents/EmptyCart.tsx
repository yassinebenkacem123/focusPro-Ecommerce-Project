import type { JSX } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const EmptyCart = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      
      <img 
        src="/icons/empty-cart.png" 
        alt="Empty Cart" 
        className="w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105 mb-6"
      />  
      
      <h1 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight mb-2">
        Your cart is empty
      </h1>
      <p className="text-stone-500 text-lg mb-8 max-w-md">
        Looks like you haven't added anything to your cart yet. Let's find something you'll love!
      </p>

      <button 
        onClick={() => navigate("/products")}
        title="Continue shopping"
        className="group flex items-center gap-3 bg-stone-800 text-white px-8 py-3.5 rounded-full font-medium shadow-md transition-all duration-300 hover:bg-stone-900 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
      >
        {/* Arrow moves left slightly when hovering over the button */}
        <BsArrowLeft 
          size={24} 
          className="transition-transform duration-300 group-hover:-translate-x-1" 
        /> 
        Continue Shopping
      </button>

    </div>
  )
}

export default EmptyCart