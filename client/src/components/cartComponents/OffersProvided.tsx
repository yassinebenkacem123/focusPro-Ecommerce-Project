import { FaShippingFast } from "react-icons/fa";

const OffersProvided = () => {
  return (
    <div className='p-4  border border-stone-600/20 bg-stone-800 h-full shadow-md rounded-lg'>
        <div>
            <h1 className='text-2xl text-white font-medium'>
                <FaShippingFast className="inline mr-2" size={30}/> Offers Provided
            </h1>
            <ul className="list-disc list-inside mt-4 text-stone-200">
                <li>Free shipping on orders over $50</li>
                <li>30-day return policy</li>
                <li>24/7 customer support</li>
            </ul>
        </div>
        <div>
            <h1 className='text-2xl text-white font-medium mt-6'>
                Why Shop With Us?
            </h1>
            <ul className="list-disc list-inside mt-4 text-stone-200">
                <li>Competitive prices</li>
                <li>Fast and reliable shipping</li>
                <li>Secure payment options</li>
            </ul>
            
        </div>
    </div>
  )
}

export default OffersProvided