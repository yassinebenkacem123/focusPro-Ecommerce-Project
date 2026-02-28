import React from 'react'
import { MdDiscount } from "react-icons/md";

const PromoCode = () => {
  return (
    <div className='p-4  border bg-stone-800 border-stone-600/20 h-full shadow-md rounded-2xl'>
        <h1 className='text-2xl text-white font-medium'>
            
             <MdDiscount className="inline mr-2" size={30}/> Promo Code
        </h1>
        <div className='flex gap-4 mt-4'>
            <input type="text" placeholder='Enter your promo code' className='w-full p-3 rounded-lg border text-white border-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-400/80'/>
            <button className='bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-500/90 duration-200'>
                Apply
            </button>
        </div>
    </div>
  )
}

export default PromoCode