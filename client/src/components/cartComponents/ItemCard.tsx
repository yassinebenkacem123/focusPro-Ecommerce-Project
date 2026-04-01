import React from 'react'
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";
import type { CartItem } from '../../features/cart/cartSlice';
import SetQuantity from './SetQuantity';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../../features/cart/cartSlice';
import { toast } from 'react-toastify';

const ItemCard = ({
    item,
}: {
    item: CartItem;
    index: number;
    length: number;
}): React.JSX.Element => {
    const dispatch = useDispatch();
    const currentQuantity = item.quantity;
    const maxQty = item.availableQuantity;
    const atMaxQty = typeof maxQty === "number" && Number.isFinite(maxQty) && currentQuantity >= maxQty;

    const handleQtyIncrease = () => {
        if (atMaxQty) {
            toast.warning(`Only ${maxQty} unit(s) of ${item.productName} available in stock.`);
            return;
        }

        dispatch(increaseQuantity({ productId: item.productId }));

    }
    const handleQtyDecrease = () => {
        dispatch(decreaseQuantity({ productId: item.productId }));
    }

    const handleRemoveItem = () => {
        dispatch(removeItem({ productId: item.productId }));
        toast.success(`${item.productName} removed from cart.`);
    }
    return (
        <div className={"flex w-full justify-between border-b bg-stone-800 border-stone-300/40 p-4"}>
            <div className='flex  gap-10 '>
                <img src="https://placehold.co/200x200" alt={item.productName} className='w-50 h-50 object-cover rounded-lg' />
                <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl text-stone-100 font-medium'>
                        {item.productName}
                    </h1>
                    <p className='text-md text-stone-400'>
                        {item.description}
                    </p>
                    <div className='items-center flex gap-4'>
                        <button
                            onClick={handleQtyDecrease}
                            title='decrease quantity'
                            disabled={currentQuantity <= 1}
                            className={`p-3 ${currentQuantity <= 1 ? "bg-orange-600/50 cursor-not-allowed text-stone-100" : "cursor-pointer bg-stone-100 text-black"} rounded-lg  `}>
                            <HiMinusSmall size={20} />
                        </button>
                        <SetQuantity
                            quantity={currentQuantity}
                            cardCounter={true}
                        />
                        <button
                            onClick={handleQtyIncrease}
                            title='increase quantity'
                            disabled={atMaxQty}
                            className={`p-3 text-white rounded-lg ${atMaxQty ? "bg-orange-500/50 cursor-not-allowed" : "bg-orange-500 cursor-pointer"}`}>
                            <GoPlus size={20} />
                        </button>
                    </div>

                </div>
            </div>
            <div className='w-[20%] flex-col flex items-end justify-between gap-4'>
                <h1 className='text-2xl font-medium text-stone-100'>
                    {item.price}$
                </h1>
                <button
                    onClick={handleRemoveItem}
                    className='flex items-center justify-center text-2xl hover:bg-red-500/20 py-1 px-2 rounded-lg gap-2 text-red-500'
                >
                    <HiMiniTrash size={20} /> remove
                </button>
            </div>
        </div>
    )
}

export default ItemCard