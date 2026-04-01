import { BsArrowLeft } from "react-icons/bs";
import Template from "../../utils/Template"
import { useNavigate } from "react-router-dom"
import ItemCard from "../../components/cartComponents/ItemCard"
import PromoCode from "../../components/cartComponents/PromoCode"
import OrderSummary from "../../components/cartComponents/OrderSummary"
import { HiMiniShoppingCart } from "react-icons/hi2";
import OffersProvided from "../../components/cartComponents/OffersProvided"
import SpecialInstruction from "../../components/cartComponents/SpecialInstruction"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import type { CartState } from "../../features/cart/cartSlice"
import EmptyCart from "../../components/cartComponents/EmptyCart";
const Cart = () => {
  const {cart} = useSelector((state: RootState)=> state.carts) as CartState
  const totalPrice = cart.reduce((acc, item)=> acc + item.price * item.quantity, 0)
  const navigate = useNavigate()  
  const cartEmpty = cart.length === 0
  const {username} = useSelector((state: RootState)=> state.auth)
  return (
    <Template>
        <section className="min-h-screen items-center  justify-center flex-col px-15  gap-5 flex">
          { (cartEmpty) && 
            <div className="flex w-full  flex-col justify-center  items-center">
              {<h1 className="text-center text-2xl font-normal">

              Have an account?<br/> 
              <span className="text-md">
                <span onClick={()=> navigate("/auth")} className="text-orange-500 underline cursor-pointer hover:text-orange-500/90 duration-200">Login</span> to see your saved items.
              </span>
             </h1> }
            {cartEmpty && <EmptyCart  />}
            
           </div>
          }
          { !cartEmpty &&
            <div className="flex w-full flex-col gap-3"> 
              <h1 className="text-2xl flex  items-center gap-5 mb-1 font-medium">
                <HiMiniShoppingCart size={30}/>
                Your Cart
              </h1>
            <div className="w-full flex items-start gap-10">
            {/* left part */}
           <div className="w-[70%] flex flex-col gap-4">
             <div className="w-full border overflow-hidden   border-stone-600/20  shadow-md rounded-2xl">
              {
                cart.map((item, index)=>(
                  <ItemCard
                    length={cart.length}
                    key={item.productId} 
                    index={index}
                    item={item}/>
                ))}
            </div>
            <SpecialInstruction />
           </div>
            {/* right part */}
            <div className="w-[30%]  flex-col flex gap-6 h-full">
                <PromoCode  />
                <OrderSummary totalPrice={totalPrice}/>
                <OffersProvided />
              <div>

              </div>
            </div>

          </div>
        </div>}
        </section>
    </Template> 
  )
}

export default Cart