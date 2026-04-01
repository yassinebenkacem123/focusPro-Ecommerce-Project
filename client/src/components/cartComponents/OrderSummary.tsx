import React from 'react';
import { HiLockClosed } from "react-icons/hi2";


const OrderSummary = ({totalPrice}:{totalPrice: number}) => {

  return (
    <div className=" p-4  border bg-stone-800 border-stone-600/20 h-full shadow-md rounded-2xl">
      <h2 className="text-xl font-bold text-white mb-6">
        Order Summary
      </h2>

      <div className="flex flex-col gap-4">
        {/* Line Items */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-stone-200">
            <span className="text-sm">Subtotal</span>
            <span className="font-medium text-stone-100">${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center text-stone-200">
            <span className="text-sm">Shipping</span>
            <span className="font-medium text-stone-100">
                $10.00
            </span>
          </div>

            <div className="flex justify-between items-center text-stone-200">
              <span className="text-sm">Estimated Tax</span>
              <span className="font-medium text-stone-100">$15.00</span>
            </div>
          
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-100 my-2" />

        {/* Grand Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-stone-100">Total</span>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-stone-100 block">
              ${(totalPrice + 10 + 15).toFixed(2)}
            </span>
            <p className="text-[10px] text-stone-400 uppercase tracking-wider">Including VAT</p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="group mt-4 relative w-full bg-orange-500 text-white font-semibold py-4 rounded-xl hover:bg-orange-500/90 transition-all duration-200">
          <span className="flex items-center justify-center gap-2">
            Proceed to Checkout
          </span>
        </button>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 mt-2 text-stone-400">
          <HiLockClosed size={14} />
          <span className="text-[11px] font-medium uppercase tracking-tight">
            Secure SSL Checkout
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;